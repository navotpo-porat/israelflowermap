import { useState, useEffect } from 'react';
import { sightingsData, extraSightings, type Sighting } from '@/data/sightings';
import { supabase } from '@/integrations/supabase/client';

export function useSightings() {
  const [sightings, setSightings] = useState<Sighting[]>([...sightingsData, ...extraSightings]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWithRetry = async (retries = 1): Promise<{ data: any; error: any }> => {
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
          const proxyBaseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/proxy-image`;
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
