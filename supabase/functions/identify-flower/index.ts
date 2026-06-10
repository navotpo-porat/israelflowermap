import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SPECIES_LIST = [
  { id: "anemone-coronaria", hebrewName: "כלנית", englishName: "Crown Anemone", latinName: "Anemone coronaria" },
  { id: "iris-mariae", hebrewName: "אירוס", englishName: "Iris", latinName: "Iris mariae" },
  { id: "tulipa-agenensis", hebrewName: "צבעוני", englishName: "Mountain Tulip", latinName: "Tulipa agenensis" },
  { id: "narcissus-tazetta", hebrewName: "נרקיס", englishName: "Narcissus", latinName: "Narcissus tazetta" },
  { id: "papaver-umbonatum", hebrewName: "פרג", englishName: "Poppy", latinName: "Papaver umbonatum" },
  { id: "crocus-hyemalis", hebrewName: "כרכום חורפי", englishName: "Winter Crocus", latinName: "Crocus hyemalis" },
  { id: "sternbergia-clusiana", hebrewName: "חלמונית", englishName: "Sternbergia", latinName: "Sternbergia clusiana" },
  { id: "urginea-maritima", hebrewName: "חצב", englishName: "Sea Squill", latinName: "Urginea maritima" },
  { id: "paeonia-mascula", hebrewName: "אדמונית החורש", englishName: "Woodland Peony", latinName: "Paeonia mascula" },
  { id: "colchicum-stevenii", hebrewName: "סתוונית", englishName: "Autumn Crocus", latinName: "Colchicum stevenii" },
  { id: "cyclamen-persicum", hebrewName: "רקפת", englishName: "Cyclamen", latinName: "Cyclamen persicum" },
  { id: "lilium-candidum", hebrewName: "שושן צחור", englishName: "White Lily", latinName: "Lilium candidum" },
  { id: "lupinus-pilosus", hebrewName: "תורמוס", englishName: "Blue Lupine", latinName: "Lupinus pilosus" },
];

const SYSTEM_PROMPT = `You are an expert botanist specializing in Israeli wildflowers. 
You will be shown a photo and must identify which flower species it contains.

You MUST ONLY identify from the following 13 species found in Israel:
${SPECIES_LIST.map((s) => `- ${s.englishName} (${s.hebrewName}, ${s.latinName})`).join("\n")}

If the flower in the image does not match any of these species, say so clearly.

Respond using the "identify_flowers" tool.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Strip data URL prefix if present
    const base64Data = imageBase64.includes(",") ? imageBase64.split(",")[1] : imageBase64;
    const mimeMatch = imageBase64.match(/^data:(image\/\w+);/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:${mimeType};base64,${base64Data}` },
              },
              {
                type: "text",
                text: "Identify the flower(s) in this image. Return your top matches with confidence percentages.",
              },
            ],
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "identify_flowers",
              description: "Return identified flower species with confidence scores",
              parameters: {
                type: "object",
                properties: {
                  matches: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", description: "Species ID from the catalog" },
                        englishName: { type: "string" },
                        hebrewName: { type: "string" },
                        latinName: { type: "string" },
                        confidence: {
                          type: "number",
                          description: "Confidence percentage 0-100",
                        },
                      },
                      required: ["id", "englishName", "hebrewName", "latinName", "confidence"],
                      additionalProperties: false,
                    },
                  },
                  noMatch: {
                    type: "boolean",
                    description: "True if the flower does not match any known species",
                  },
                  noMatchReason: {
                    type: "string",
                    description: "Explanation if no match found",
                  },
                },
                required: ["matches", "noMatch"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "identify_flowers" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "rate_limit", message: "Too many requests. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "payment_required", message: "AI credits depleted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "ai_error", message: "Failed to identify flower" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      return new Response(JSON.stringify({ error: "no_result", message: "Could not identify the flower" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("identify-flower error:", e);
    return new Response(
      JSON.stringify({ error: "server_error", message: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
