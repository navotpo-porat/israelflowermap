const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const KML_URL = 'https://www.google.com/maps/d/kml?forcekml=1&mid=1z2p-jfiNqhyCKfFQjxDO_iI9HUDDXsQ';

const speciesMap: Record<string, string> = {
  'צבעוני': 'Tulip',
  'פרגים': 'Poppies',
  'נרקיסים': 'Narcissus',
  'אדמונית החורש': 'Peony',
  'רקפות': 'Cyclamen',
  'יקינטון': 'Hyacinth',
  'כלניות': 'Anemones',
  'תורמוסים': 'Lupines',
  'חלמוניות': 'Sternbergia',
  'חלמניות': 'Sternbergia',
  'שקדיות': 'Almond Blossoms',
  'אירוסים': 'Irises',
  'שושן צחור': 'White Lily',
  'סתוונית': 'Autumn Crocus',
  'חצבים': 'Sea Squill',
  'כרכום': 'Crocus',
};

const speciesSeasons: Record<string, { he: string; en: string }> = {
  'כלניות': { he: 'ינואר–מרץ', en: 'January–March' },
  'רקפות': { he: 'ינואר–מרץ', en: 'January–March' },
  'פרגים': { he: 'מרץ–מאי', en: 'March–May' },
  'תורמוסים': { he: 'פברואר–מרץ', en: 'February–March' },
  'נרקיסים': { he: 'נובמבר–פברואר', en: 'November–February' },
  'צבעוני': { he: 'אפריל–מאי', en: 'April–May' },
  'חלמוניות': { he: 'נובמבר–דצמבר', en: 'November–December' },
  'חלמניות': { he: 'נובמבר–דצמבר', en: 'November–December' },
  'אדמונית החורש': { he: 'אפריל', en: 'April' },
  'יקינטון': { he: 'יולי', en: 'July' },
  'שקדיות': { he: 'ינואר–פברואר', en: 'January–February' },
  'אירוסים': { he: 'פברואר–מרץ', en: 'February–March' },
  'שושן צחור': { he: 'אפריל–מאי', en: 'April–May' },
  'סתוונית': { he: 'אוקטובר–נובמבר', en: 'October–November' },
  'חצבים': { he: 'אוגוסט–ספטמבר', en: 'August–September' },
  'כרכום': { he: 'נובמבר–דצמבר', en: 'November–December' },
};

function cleanText(s: string): string {
  return s.replace(/[\u200F\u200E\u202A\u202B\u202C\u200B\uFEFF]/g, '').trim();
}

function getEnglishSpecies(he: string): string {
  const cleaned = cleanText(he);
  if (cleaned.includes(',')) {
    const parts = cleaned.split(',').map(s => s.trim());
    const translated = parts.map(p => speciesMap[p] || p);
    if (translated.length === 2) return `${translated[0]} & ${translated[1]}`;
    return translated.slice(0, -1).join(', ') + ' & ' + translated[translated.length - 1];
  }
  return speciesMap[cleaned] || cleaned;
}

function getSeasonForSpecies(speciesHe: string): { he: string; en: string } {
  const cleaned = cleanText(speciesHe);
  const primary = cleaned.includes(',') ? cleaned.split(',')[0].trim() : cleaned;
  return speciesSeasons[primary] || { he: 'כל השנה', en: 'Year-round' };
}

function getRegionFromCoords(lat: number): string {
  if (lat > 33.0) return 'Upper Galilee';
  if (lat > 32.7) return 'Lower Galilee';
  if (lat > 32.4) return 'Jezreel Valley';
  if (lat > 32.0) return 'Central Israel';
  if (lat > 31.7) return 'Jerusalem Hills';
  if (lat > 31.3) return 'Northern Negev';
  return 'Negev';
}

function getRegionFromCoordsHe(lat: number): string {
  if (lat > 33.0) return 'גליל עליון';
  if (lat > 32.7) return 'גליל תחתון';
  if (lat > 32.4) return 'עמק יזרעאל';
  if (lat > 32.0) return 'מרכז הארץ';
  if (lat > 31.7) return 'הרי ירושלים';
  if (lat > 31.3) return 'צפון הנגב';
  return 'נגב';
}

/** Extract ALL image URLs from description HTML */
function extractImageUrls(rawDesc: string): string[] {
  const urls: string[] = [];
  
  // Google Drive direct view links (escaped &amp;)
  const driveMatches = rawDesc.matchAll(/https:\/\/drive\.google\.com\/uc\?export=view&amp;id=([^"'&\s<]+)/g);
  for (const m of driveMatches) {
    urls.push(`https://drive.google.com/uc?export=view&id=${m[1]}`);
  }
  
  // Non-escaped version
  const driveMatches2 = rawDesc.matchAll(/https:\/\/drive\.google\.com\/uc\?export=view&id=([^"'&\s<]+)/g);
  for (const m of driveMatches2) {
    const url = `https://drive.google.com/uc?export=view&id=${m[1]}`;
    if (!urls.includes(url)) urls.push(url);
  }
  
  // Google Drive open links
  const driveOpenMatches = rawDesc.matchAll(/https:\/\/drive\.google\.com\/open\?id=([^"'&\s<]+)/g);
  for (const m of driveOpenMatches) {
    const url = `https://drive.google.com/uc?export=view&id=${m[1]}`;
    if (!urls.includes(url)) urls.push(url);
  }
  
  // img src tags - include ALL images including mymaps.usercontent
  const imgMatches = rawDesc.matchAll(/<img[^>]+src=["']([^"']+)["']/g);
  for (const m of imgMatches) {
    const url = m[1];
    if (!urls.includes(url)) {
      urls.push(url);
    }
  }
  
  return urls;
}

/** Extract plain text description from HTML, preserving spacing */
function extractDescription(rawDesc: string): string {
  // Remove img tags entirely
  let text = rawDesc.replace(/<img[^>]*>/gi, '');
  // Replace <br>, <br/>, <p>, <div> with newlines
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/?(p|div|li|tr|td)[^>]*>/gi, '\n');
  // Add space before remaining closing tags to prevent concatenation
  text = text.replace(/<\/[^>]+>/g, ' ');
  // Remove remaining HTML tags
  text = text.replace(/<[^>]*>/g, '');
  // Decode HTML entities
  text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  // Clean unicode markers
  text = cleanText(text);
  // Collapse multiple spaces/newlines
  text = text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
  return text;
}

interface Sighting {
  id: number;
  lat: number;
  lng: number;
  species: { he: string; en: string };
  location: { he: string; en: string };
  season: { he: string; en: string };
  image?: string;
  images?: string[];
  description?: string;
}

function parseKML(kmlText: string): Sighting[] {
  const sightings: Sighting[] = [];
  const placemarkRegex = /<Placemark>([\s\S]*?)<\/Placemark>/g;
  let match;
  let id = 1;
  
  while ((match = placemarkRegex.exec(kmlText)) !== null) {
    const placemark = match[1];
    
    const nameMatch = placemark.match(/<name><!\[CDATA\[([\s\S]*?)\]\]><\/name>/) 
      || placemark.match(/<name>([\s\S]*?)<\/name>/);
    const rawName = nameMatch ? nameMatch[1] : '';
    const name = cleanText(rawName);
    
    const coordMatch = placemark.match(/<coordinates>([\s\S]*?)<\/coordinates>/);
    if (!coordMatch) continue;
    
    const coordStr = coordMatch[1].trim();
    const parts = coordStr.split(',');
    if (parts.length < 2) continue;
    
    const lng = parseFloat(parts[0]);
    const lat = parseFloat(parts[1]);
    
    if (isNaN(lat) || isNaN(lng)) continue;
    if (!name) continue;
    // Skip navigation/direction entries
    if (name.startsWith('Directions from')) continue;
    
    const descMatch = placemark.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)
      || placemark.match(/<description>([\s\S]*?)<\/description>/);
    const rawDesc = descMatch ? descMatch[1] : '';
    
    // Log first few raw descriptions for debugging
    if (id <= 3) {
      console.log(`RAW DESC #${id} (${name}):`, rawDesc.substring(0, 500));
    }
    
    const images = extractImageUrls(rawDesc);
    const image = images.length > 0 ? images[0] : undefined;
    const description = extractDescription(rawDesc);
    
    // Use full description as-is for the description field
    // For location, use the region based on coordinates (reliable)
    const locationHe = getRegionFromCoordsHe(lat);
    const locationEn = getRegionFromCoords(lat);
    const speciesHe = name;
    const speciesEn = getEnglishSpecies(speciesHe);
    const season = getSeasonForSpecies(speciesHe);
    
    sightings.push({
      id: id++, lat, lng,
      species: { he: speciesHe, en: speciesEn },
      location: { he: locationHe, en: locationEn },
      season,
      image,
      images: images.length > 0 ? images : undefined,
      description: description || undefined,
    });
  }
  
  return sightings;
}

async function extractKMLFromKMZ(data: Uint8Array): Promise<string> {
  const decoder = new TextDecoder('utf-8');
  let offset = 0;
  
  while (offset < data.length - 4) {
    if (data[offset] !== 0x50 || data[offset + 1] !== 0x4B ||
        data[offset + 2] !== 0x03 || data[offset + 3] !== 0x04) {
      break;
    }
    
    const compressionMethod = data[offset + 8] | (data[offset + 9] << 8);
    const compressedSize = data[offset + 18] | (data[offset + 19] << 8) | (data[offset + 20] << 16) | (data[offset + 21] << 24);
    const filenameLen = data[offset + 26] | (data[offset + 27] << 8);
    const extraLen = data[offset + 28] | (data[offset + 29] << 8);
    
    const filename = decoder.decode(data.slice(offset + 30, offset + 30 + filenameLen));
    const dataStart = offset + 30 + filenameLen + extraLen;
    
    if (filename.endsWith('.kml')) {
      const fileData = data.slice(dataStart, dataStart + compressedSize);
      
      if (compressionMethod === 0) {
        return decoder.decode(fileData);
      } else if (compressionMethod === 8) {
        const ds = new DecompressionStream('deflate-raw');
        const writer = ds.writable.getWriter();
        const reader = ds.readable.getReader();
        
        const chunks: Uint8Array[] = [];
        writer.write(fileData);
        writer.close();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }
        const totalLen = chunks.reduce((sum, c) => sum + c.length, 0);
        const result = new Uint8Array(totalLen);
        let pos = 0;
        for (const chunk of chunks) {
          result.set(chunk, pos);
          pos += chunk.length;
        }
        return decoder.decode(result);
      }
    }
    
    offset = dataStart + compressedSize;
  }
  
  throw new Error('No KML file found in KMZ');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching KML from Google My Maps... v3');
    
    const response = await fetch(`${KML_URL}&_=${Date.now()}`, { 
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch KML: ${response.status} ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    let kmlText: string;
    
    if (bytes[0] === 0x50 && bytes[1] === 0x4B) {
      console.log('Detected KMZ format, extracting...');
      kmlText = await extractKMLFromKMZ(bytes);
    } else {
      kmlText = new TextDecoder().decode(bytes);
    }
    
    const placemarkCount = (kmlText.match(/<Placemark>/g) || []).length;
    const peonyCount = (kmlText.match(/אדמונית/g) || []).length;
    console.log(`KML size: ${kmlText.length} bytes, raw placemarks: ${placemarkCount}, peony mentions: ${peonyCount}`);
    const sightings = parseKML(kmlText);
    console.log(`Parsed ${sightings.length} sightings from KML`);
    if (sightings.length > 0) {
      const withImages = sightings.filter(s => s.image);
      console.log(`${withImages.length} sightings have images`);
    }
    
    return new Response(
      JSON.stringify({ success: true, data: sightings }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0',
        } 
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
