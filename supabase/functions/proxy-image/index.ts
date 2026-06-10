const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const ALLOWED_DOMAINS = [
  'mymaps.usercontent.google.com',
  'drive.google.com',
  'lh3.googleusercontent.com',
  'lh4.googleusercontent.com',
  'lh5.googleusercontent.com',
  'lh6.googleusercontent.com',
  'drive.usercontent.google.com',
];

/** Convert Google Drive sharing URLs to direct download URLs */
function toDirectDriveUrl(url: string): string {
  // drive.google.com/uc?export=view&id=XXX → drive.usercontent.google.com/download?id=XXX&export=view
  const ucMatch = url.match(/drive\.google\.com\/uc\?.*id=([^&\s]+)/);
  if (ucMatch) {
    return `https://drive.usercontent.google.com/download?id=${ucMatch[1]}&export=view`;
  }
  // drive.google.com/open?id=XXX
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&\s]+)/);
  if (openMatch) {
    return `https://drive.usercontent.google.com/download?id=${openMatch[1]}&export=view`;
  }
  // drive.google.com/file/d/XXX/view → direct download
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (fileMatch) {
    return `https://drive.usercontent.google.com/download?id=${fileMatch[1]}&export=view`;
  }
  return url;
}

function isDomainAllowed(hostname: string): boolean {
  return ALLOWED_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let imageUrl: string | null = null;

    if (req.method === 'GET') {
      const params = new URL(req.url).searchParams;
      imageUrl = params.get('url');
    } else {
      const body = await req.json();
      imageUrl = body.url;
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
      return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate domain whitelist
    const parsedUrl = new URL(imageUrl);
    if (!isDomainAllowed(parsedUrl.hostname)) {
      return new Response(JSON.stringify({ error: 'Domain not allowed' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Convert Google Drive URLs to direct download format
    const directUrl = toDirectDriveUrl(imageUrl);

    // Follow redirects manually to handle Google Drive confirmation pages
    let finalResponse: Response | null = null;
    let currentUrl = directUrl;
    const maxRedirects = 5;

    for (let i = 0; i < maxRedirects; i++) {
      const response = await fetch(currentUrl, {
        redirect: 'manual',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        if (!location) break;
        currentUrl = location.startsWith('http') ? location : new URL(location, currentUrl).href;
        continue;
      }

      // Check if we got an HTML page (Drive virus scan warning) instead of an image
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        const html = await response.text();
        // Extract the confirm download link from the virus scan page
        const confirmMatch = html.match(/href="(\/uc\?export=download[^"]+)"/);
        if (confirmMatch) {
          currentUrl = `https://drive.google.com${confirmMatch[1].replace(/&amp;/g, '&')}`;
          continue;
        }
        // Try alternate confirm pattern
        const confirmMatch2 = html.match(/action="([^"]+)"/);
        if (confirmMatch2 && html.includes('download')) {
          currentUrl = confirmMatch2[1].replace(/&amp;/g, '&');
          if (!currentUrl.startsWith('http')) {
            currentUrl = `https://drive.google.com${currentUrl}`;
          }
          continue;
        }
        // If it's HTML but we can't find a confirm link, fail
        break;
      }

      finalResponse = response;
      break;
    }

    if (!finalResponse || !finalResponse.ok) {
      // Try the original URL as fallback with normal redirect following
      const fallbackResponse = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });
      
      if (!fallbackResponse.ok) {
        return new Response(JSON.stringify({ error: `Upstream returned ${fallbackResponse.status}` }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      const ct = fallbackResponse.headers.get('content-type') || '';
      if (ct.includes('text/html')) {
        return new Response(JSON.stringify({ error: 'Received HTML instead of image' }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      finalResponse = fallbackResponse;
    }

    const responseContentType = finalResponse.headers.get('content-type') || 'image/jpeg';
    const imageData = await finalResponse.arrayBuffer();

    return new Response(imageData, {
      headers: {
        ...corsHeaders,
        'Content-Type': responseContentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
