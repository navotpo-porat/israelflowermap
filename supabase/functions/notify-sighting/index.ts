import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { species, floweringStage, location, notes, date, imageUrl } = await req.json();

    const stageLabels: Record<string, string> = {
      start: '🌱 תחילת פריחה',
      peak: '🌸 שיא פריחה',
      end: '🍂 סוף פריחה',
    };

    const locationText = location
      ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
      : 'לא צוין';

    // Try to fetch the image and attach as inline attachment so Gmail shows it
    // automatically without requiring "Display images" click.
    let imageSection = '';
    let attachments: Array<{ filename: string; content: string; content_id: string }> = [];

    if (imageUrl) {
      try {
        const imgRes = await fetch(imageUrl);
        if (!imgRes.ok) throw new Error(`status ${imgRes.status}`);
        const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
        const buf = new Uint8Array(await imgRes.arrayBuffer());
        // base64 encode in chunks to avoid call-stack overflow on large images
        let binary = '';
        const chunk = 0x8000;
        for (let i = 0; i < buf.length; i += chunk) {
          binary += String.fromCharCode(...buf.subarray(i, i + chunk));
        }
        const base64 = btoa(binary);
        const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
        attachments.push({
          filename: `flower.${ext}`,
          content: base64,
          content_id: 'flower-image',
        });
        imageSection = `<div style="margin: 15px 0;"><img src="cid:flower-image" alt="תמונת פריחה" style="max-width: 100%; border-radius: 8px; border: 1px solid #ddd;" /></div>`;
      } catch (e) {
        console.warn('Could not fetch image for inline attachment, falling back to URL:', e);
        imageSection = `<div style="margin: 15px 0;"><img src="${imageUrl}" alt="תמונת פריחה" style="max-width: 100%; border-radius: 8px; border: 1px solid #ddd;" /></div>`;
      }
    }

    const html = `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2d6a4f; border-bottom: 2px solid #95d5b2; padding-bottom: 10px;">🌸 דיווח פריחה חדש!</h1>
        ${imageSection}
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">מין הפרח:</td><td style="padding: 8px 0;">${species || 'לא צוין'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">שלב פריחה:</td><td style="padding: 8px 0;">${stageLabels[floweringStage] || floweringStage}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">מיקום:</td><td style="padding: 8px 0;">${locationText}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">הערות:</td><td style="padding: 8px 0;">${notes || 'אין'}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">תאריך ושעה:</td><td style="padding: 8px 0;">${date}</td></tr>
        </table>
        ${location ? `<p style="margin-top: 15px;"><a href="https://www.google.com/maps?q=${location.lat},${location.lng}" style="color: #2d6a4f;">📍 הצג במפה</a></p>` : ''}
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Bloom Finder <onboarding@resend.dev>',
        to: ['navotpo@gmail.com'],
        subject: '🌸 דיווח פריחה חדש!',
        html,
        ...(attachments.length ? { attachments } : {}),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      throw new Error(`Resend API error: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
