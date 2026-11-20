import { useState, useEffect } from 'react';
import { sightingsData, extraSightings, type Sighting } from '@/data/sightings';
import { supabase } from '@/integrations/supabase/client';

export function useSightings() {
  const [sightings, setSightings] = useState<Sighting[]>([...sightingsData, ...extraSightings]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Primary source: our own Vercel API route (/api/sightings), which reads the
    // Google My Maps KML directly. Fallback: the Supabase edge function.
    const fetchFromVercel = async (): Promise<{ data: any; error: any }> => {
      try {
        const res = await fetch('/api/sightings');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return { data: await res.json(), error: null };
      } catch (err) {
        return { data: null, error: err };
      }
    };

    const fetchWithRetry = async (retries = 1): Promise<{ data: any; error: any }> => {
      const vercel = await fetchFromVercel();
      if (!vercel.error && vercel.data?.success && Array.isArray(vercel.data.data) && vercel.data.data.length > 0) {
        return vercel;
      }
      console.warn('Vercel /api/sightings failed, falling back to Supabase:', vercel.error);
      const result = await supabase.functions.invoke('get-sightings', {
        method: 'GET',
      });
      if (result.error && retries > 0) {
        console.warn('Retrying get-sightings after failure...');
        return fetchWithRetry(retries - 1);
      }
      return result;
    };

    const fetchSightings = async () => {
      try {
        setLoading(true);
        const { data, error: fnError } = await fetchWithRetry(1);
        
        if (fnError) throw fnError;
        
        if (data?.success && Array.isArray(data.data) && data.data.length > 0) {
          const proxyBaseUrl = '/api/proxy-image';
          const processed = data.data.map((s: Sighting) => ({
            ...s,
            image: s.image ? getProxiedUrl(s.image, proxyBaseUrl) : undefined,
            images: s.images?.map((img: string) => getProxiedUrl(img, proxyBaseUrl)),
          }));
          setSightings([...processed, ...extraSightings]);
          setError(null);
        } else {
          console.warn('Edge function returned no data, using static fallback');
        }
      } catch (err) {
        console.error('Failed to fetch sightings, using static fallback:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchSightings();
  }, []);

  return { sightings, loading, error };
}

function getProxiedUrl(originalUrl: string, proxyBaseUrl: string): string {
  // Only proxy Google-hosted images that need it
  if (
    originalUrl.includes('mymaps.usercontent.google.com') ||
    originalUrl.includes('drive.google.com') ||
    originalUrl.includes('googleusercontent.com')
  ) {
    return `${proxyBaseUrl}?url=${encodeURIComponent(originalUrl)}`;
  }
  return originalUrl;
}
