export interface Sighting {
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

// Location-specific image imports
import admonitGalil from '@/assets/sightings/admonit-galil.jpg';
import tzivoniMaagan from '@/assets/sightings/tzivoni-maagan.jpg';
import chalmonitTabor from '@/assets/sightings/chalmonit-tabor.jpg';
import kalaniotNegev from '@/assets/sightings/kalaniot-negev.jpg';
import maaganMichael from '@/assets/sightings/maagan-michael.jpg';
import narkisimGolan from '@/assets/sightings/narkisim-golan.jpg';
import rakefetHill from '@/assets/sightings/rakefet-hill.jpg';
import rakefetHill2 from '@/assets/sightings/rakefet-hill-2.jpg';
import turmusimField from '@/assets/sightings/turmusim-field.jpg';
import yakintonPool from '@/assets/sightings/yakinton-pool.jpg';
import horvatHamelach from '@/assets/sightings/horvat-hamelach.jpg';
import irusimNesZiona from '@/assets/sightings/irusim-nes-ziona.jpg';
import kalaniotJezreel from '@/assets/sightings/kalaniot-jezreel.jpg';
import narkisim from '@/assets/sightings/narkisim.jpg';
import stavvanit from '@/assets/sightings/stavvanit.jpg';
import pargimNegev from '@/assets/sightings/pargim-negev.jpg';
import tzivoniNew from '@/assets/sightings/tzivoni-new.jpg';
import rakefetHill3 from '@/assets/sightings/rakefet-hill-3.jpg';
import shoshanTzachor from '@/assets/sightings/shoshan-tzachor.jpg';
import turmusimGeneral from '@/assets/sightings/turmusim-general.jpg';
import turmusimShfela from '@/assets/sightings/turmusim-shfela.jpg';
import givatHatzvaonim from '@/assets/sightings/givat-hatzvaonim.jpg';
import chalmoniotTabor2 from '@/assets/sightings/chalmoniot-tabor-2.jpg';
import chalmaniotNegev from '@/assets/sightings/chalmaniot-negev.jpg';
import chatzavim from '@/assets/sightings/chatzavim.jpg';
import pargimTrain from '@/assets/sightings/pargim-train.jpg';
import pargimNegev2 from '@/assets/sightings/pargim-negev-2.jpg';
import pargimNegev3 from '@/assets/sightings/pargim-negev-3.jpeg';
import shkeidiot from '@/assets/sightings/shkeidiot.jpg';
import pargimCypress from '@/assets/sightings/3258892_3503652.jpeg';
import pargimTrainNew from '@/assets/sightings/3216572_3491484.png';
import pargimRehovot from '@/assets/sightings/31903_3478375.png';
import burmaRoad1 from '@/assets/sightings/31_81139_34_97717.jpg';
import burmaRoad2 from '@/assets/sightings/31_81204_34_98076.jpg';
import chamaniyaImg from '@/assets/species/chamaniya.png';

// Map sighting coordinates to location-specific images (using "lat,lng" as key)
const coordKey = (lat: number, lng: number) => `${lat.toFixed(4)},${lng.toFixed(4)}`;

const sightingCoordImageMap: Record<string, string> = {
  // אדמונית החורש - גליל עליון
  [coordKey(32.9601, 35.4153)]: admonitGalil,
  // צבעוני - גבעת הצבעונים
  [coordKey(32.5721, 34.9195)]: givatHatzvaonim,
  [coordKey(32.5657, 34.9181)]: givatHatzvaonim,
  [coordKey(32.5657, 34.9179)]: givatHatzvaonim,
  // חלמוניות - שביל החלמוניות, הר תבור
  [coordKey(32.6842, 35.3843)]: chalmoniotTabor2,
  // חלמניות - צפון הנגב
  [coordKey(31.3713, 34.8253)]: chalmaniotNegev,
  // נרקיסים
  [coordKey(32.8348, 35.7971)]: narkisim,
  [coordKey(32.3637, 34.8645)]: narkisim,
  // רקפות - גבעת הרקפות
  [coordKey(32.5606, 35.0846)]: rakefetHill3,
  // יקינטון - בריכת יקינטון
  [coordKey(32.3313, 34.8737)]: yakintonPool,
  // חורבת המלח
  [coordKey(32.5253, 34.9204)]: horvatHamelach,
  // תורמוסים - שפלה
  [coordKey(31.8228, 34.7773)]: turmusimShfela,
  // תורמוסים - אחר
  [coordKey(31.6806, 34.9774)]: turmusimGeneral,
  [coordKey(32.6043, 35.3838)]: turmusimGeneral,
  [coordKey(32.6072, 35.0750)]: turmusimGeneral,
  [coordKey(31.5653, 34.9312)]: turmusimGeneral,
  // כלניות - עמק יזרעאל
  [coordKey(32.5924, 35.2353)]: kalaniotJezreel,
  [coordKey(32.6411, 35.0980)]: kalaniotJezreel,
  [coordKey(32.7340, 35.1714)]: kalaniotJezreel,
  // כלניות - אחר
  [coordKey(31.7503, 34.9754)]: kalaniotNegev,
  [coordKey(31.4366, 34.4711)]: kalaniotNegev,
  [coordKey(31.4986, 34.8672)]: kalaniotNegev,
  [coordKey(31.4998, 34.8800)]: kalaniotNegev,
  [coordKey(31.5017, 34.8973)]: kalaniotNegev,
  [coordKey(31.4983, 34.7192)]: kalaniotNegev,
  [coordKey(31.5006, 34.6997)]: kalaniotNegev,
  [coordKey(32.5262, 35.0486)]: kalaniotNegev,
  [coordKey(32.7041, 35.1291)]: kalaniotNegev,
  [coordKey(32.6024, 35.0686)]: kalaniotNegev,
  [coordKey(31.4454, 34.5225)]: kalaniotNegev,
  // אירוסים - נס ציונה
  [coordKey(31.9311, 34.7831)]: irusimNesZiona,
  // שושן צחור - גליל תחתון
  [coordKey(32.7430, 35.0223)]: shoshanTzachor,
  [coordKey(32.7410, 35.0246)]: shoshanTzachor,
  // סתוונית - גבעת האשחרים
  [coordKey(32.5397, 34.9172)]: stavvanit,
  [coordKey(32.5398, 34.9161)]: stavvanit,
  // חצבים
  [coordKey(32.8342, 35.2768)]: chatzavim,
  [coordKey(32.7082, 34.9462)]: chatzavim,
  // פרגים - שדה ליד הרכבת
  [coordKey(32.2316, 34.8474)]: pargimTrain,
  // פרגים - צפון הנגב
  [coordKey(31.5340, 34.8953)]: pargimNegev2,
  [coordKey(31.4256, 34.5100)]: pargimNegev3,
  [coordKey(31.6546, 34.9957)]: pargimNegev2,
  [coordKey(31.5865, 34.8138)]: pargimNegev2,
  [coordKey(31.5901, 34.8137)]: pargimNegev2,
  [coordKey(31.5929, 34.8150)]: pargimNegev2,
  // רקפות - שפלה
  [coordKey(31.6041, 34.8336)]: rakefetHill3,
  // אירוסים - חוף גדור
  [coordKey(32.4283, 34.8782)]: irusimNesZiona,
  // כלניות, רקפות - רמת מנשה
  [coordKey(32.5264, 35.0498)]: kalaniotNegev,
};

// Map species Hebrew names to image paths (fallback)
const speciesImageMap: Record<string, string> = {
  'כלניות': kalaniotNegev,
  'רקפות': rakefetHill3,
  'תורמוסים': turmusimGeneral,
  'נרקיסים': narkisim,
  'צבעוני': tzivoniNew,
  'חלמוניות': chalmoniotTabor2,
  'חלמניות': chalmaniotNegev,
  'אדמונית החורש': admonitGalil,
  'אירוסים': irusimNesZiona,
  'שושן צחור': shoshanTzachor,
  'סתוונית': stavvanit,
  'פרגים': pargimNegev2,
  'חצבים': chatzavim,
  'שקדיות': shkeidiot,
  'כרכום': chalmaniotNegev,
};

export const getSightingImage = (sighting: Sighting): string => {
  if (sighting.image) {
    return sighting.image;
  }
  return getSightingFallbackImage(sighting);
};

/** Get next image from the images array when current one fails */
export const getNextSightingImage = (sighting: Sighting, failedUrl: string): string | null => {
  if (!sighting.images || sighting.images.length <= 1) return null;
  const currentIndex = sighting.images.indexOf(failedUrl);
  if (currentIndex >= 0 && currentIndex < sighting.images.length - 1) {
    return sighting.images[currentIndex + 1];
  }
  return null;
};

export const getSightingFallbackImage = (sighting: Sighting): string => {
  return sightingCoordImageMap[coordKey(sighting.lat, sighting.lng)] || speciesImageMap[getPrimarySpecies(sighting.species.he)] || kalaniotNegev;
};

export const getSpeciesImage = (speciesHe: string): string => {
  const primary = speciesHe.includes(',') ? speciesHe.split(',')[0].trim() : speciesHe;
  return speciesImageMap[primary] || kalaniotNegev;
};

// Species name mapping Hebrew -> English
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
  'כלניות, תורמוסים': 'Anemones & Lupines',
  'כלניות, פרגים, רקפות': 'Anemones, Poppies & Cyclamen',
  'רקפות, פרגים, נרקיסים': 'Cyclamen, Poppies & Narcissus',
  'פרגים, רקפות, חרציות, אירוסים': 'Poppies, Cyclamen, Chrysanthemums & Irises',
  'כלניות, רקפות': 'Anemones & Cyclamen',
  'חרציות': 'Chrysanthemums',
};

const getEnglishSpecies = (he: string): string => speciesMap[he] || he;

// All sightings from KML file - descriptions match exactly what's written in Google Maps
export const sightingsData: Sighting[] = [
  { id: 1, lat: 32.5721311, lng: 34.9194568, species: { he: 'צבעוני', en: 'Tulip' }, location: { he: 'גבעת הצבעונים, מעגן מיכאל', en: 'Tulip Hill, Ma\'agan Michael' }, season: { he: 'אפריל–מאי', en: 'April–May' }, description: 'פריחה: אפריל–מאי\nגבעת הצבעונים של מעגן מיכאל' },
  { id: 2, lat: 32.2232625, lng: 34.8440781, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'מתחת לגשרון אוהד', en: 'Below Ohad Bridge' }, season: { he: 'מרץ–מאי', en: 'March–May' }, description: 'פריחה: מרץ–מאי\nמתחת לגשרון אוהד.' },
  { id: 3, lat: 32.5656875, lng: 34.9180625, species: { he: 'צבעוני', en: 'Tulip' }, location: { he: 'גבעת הצבעונים, מעגן מיכאל', en: 'Tulip Hill, Ma\'agan Michael' }, season: { he: 'אפריל–מאי', en: 'April–May' }, description: 'פריחה: אפריל–מאי\nגבעת הצבעונים של מעגן מיכאל' },
  { id: 4, lat: 32.8348125, lng: 35.7970625, species: { he: 'נרקיסים', en: 'Narcissus' }, location: { he: 'רמת הגולן', en: 'Golan Heights' }, season: { he: 'נובמבר–פברואר', en: 'November–February' }, description: 'נובמבר-פברואר' },
  { id: 5, lat: 32.9609637, lng: 35.4204444, species: { he: 'אדמונית החורש', en: 'Peony' }, location: { he: 'גליל תחתון', en: 'Lower Galilee' }, season: { he: 'אפריל', en: 'April' }, description: 'פריחה - אפריל' },
  { id: 501, lat: 32.9992475, lng: 35.4091465, species: { he: 'אדמונית החורש', en: 'Peony' }, location: { he: 'גליל תחתון', en: 'Lower Galilee' }, season: { he: 'אפריל', en: 'April' }, description: 'פריחה - אפריל' },
  { id: 502, lat: 32.9631077, lng: 35.3980914, species: { he: 'אדמונית החורש', en: 'Peony' }, location: { he: 'גליל תחתון', en: 'Lower Galilee' }, season: { he: 'אפריל', en: 'April' }, description: 'פריחה - אפריל' },
  { id: 6, lat: 32.525278, lng: 34.9204016, species: { he: 'רקפות, פרגים, נרקיסים', en: 'Cyclamen, Poppies & Narcissus' }, location: { he: 'חורבת המלח', en: 'Horvat HaMelach' }, season: { he: 'נובמבר–פברואר', en: 'November–February' }, description: 'פריחה נובמבר-פברואר\nחורבת המלח' },
  { id: 7, lat: 32.2214375, lng: 34.9998125, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'יער הרקפות', en: 'Cyclamen Forest' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nיער הרקפות' },
  { id: 8, lat: 32.3313125, lng: 34.8736875, species: { he: 'יקינטון', en: 'Hyacinth' }, location: { he: 'בריכת יקינטון', en: 'Hyacinth Pool' }, season: { he: 'יולי', en: 'July' }, description: 'פריחה: יולי\nבריכת יקינטון' },
  { id: 9, lat: 32.6024375, lng: 35.0685625, species: { he: 'כלניות, תורמוסים', en: 'Anemones & Lupines' }, location: { he: 'פינת הנצחה לנילי קאפמן ז״ל', en: 'Nili Kaufman Memorial' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nפינת הנצחה לזיכרה של נילי קאפמן ז״ל' },
  { id: 10, lat: 31.7711875, lng: 35.0291875, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'יער יהדות תימן', en: 'Yemenite Jewry Forest' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nיער יהדות תימן' },
  { id: 11, lat: 31.6805625, lng: 34.9774375, species: { he: 'תורמוסים', en: 'Lupines' }, location: { he: 'שפלת יהודה', en: 'Judean Foothills' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: פברואר-מרץ' },
  { id: 12, lat: 31.4365625, lng: 34.4710625, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'יער בארי', en: "Be'eri Forest" }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nיער בארי' },
  { id: 13, lat: 31.5909375, lng: 34.8191875, species: { he: 'שקדיות', en: 'Almond Blossoms' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'ינואר–פברואר', en: 'January–February' }, description: 'פריחה: ינואר - פברואר\nפריחת שקדיות' },
  { id: 14, lat: 32.0416692, lng: 34.9589393, species: { he: 'כלניות, פרגים, רקפות', en: 'Anemones, Poppies & Cyclamen' }, location: { he: 'מרכז הארץ', en: 'Central Israel' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nפריחות כלניות פרגים רקפות' },
  { id: 15, lat: 32.5605625, lng: 35.0845625, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'גבעת הרקפות', en: 'Cyclamen Hill' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nגבעת הרקפות' },
  { id: 16, lat: 31.9310625, lng: 34.7831406, species: { he: 'אירוסים', en: 'Irises' }, location: { he: 'נס ציונה', en: 'Ness Ziona' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: פברואר - מרץ\nפריחת אירוסים - נס ציונה' },
  { id: 17, lat: 32.7429875, lng: 35.0223281, species: { he: 'שושן צחור', en: 'White Lily' }, location: { he: 'גליל תחתון', en: 'Lower Galilee' }, season: { he: 'מאי', en: 'May' }, description: 'פריחה: מאי\nפריחת שושן צחור' },
  { id: 18, lat: 32.7409625, lng: 35.0246406, species: { he: 'שושן צחור', en: 'White Lily' }, location: { he: 'גליל תחתון', en: 'Lower Galilee' }, season: { he: 'מאי', en: 'May' }, description: 'פריחה: מאי\nפריחת שושן צחור' },
  { id: 19, lat: 32.2315625, lng: 34.8474219, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'שדה ליד הרכבת', en: 'Field near the train' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nפריחת פרגים בשדה לייד הרכבת' },
  { id: 20, lat: 32.5517375, lng: 35.0107344, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'עמק חפר', en: 'Hefer Valley' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nפריחת פרגים' },
  { id: 21, lat: 31.8845179, lng: 34.920646, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'שפלה', en: 'Shephelah' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nפריחת פרגים' },
  { id: 22, lat: 31.9395375, lng: 34.7991719, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'מרכז הארץ', en: 'Central Israel' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nפריחת פרגים' },
  { id: 23, lat: 31.8421875, lng: 34.7892969, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'שפלה', en: 'Shephelah' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nפריחת פרגים' },
  { id: 24, lat: 31.4986375, lng: 34.8671719, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: פברואר - מרץ\nפריחת כלניות' },
  { id: 25, lat: 31.4998125, lng: 34.8800469, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: פברואר - מרץ\nפריחת כלניות' },
  { id: 26, lat: 31.5340375, lng: 34.8953281, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: פברואר -מרץ\nפריחת פרגים' },
  { id: 27, lat: 31.5017143, lng: 34.8973335, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: פברואר - מרץ\nפריחת כלניות' },
  { id: 28, lat: 31.9550875, lng: 34.9491719, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'מרכז הארץ', en: 'Central Israel' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: בפרואר-מרץ\nפריחת רקפות' },
  { id: 29, lat: 32.5678125, lng: 35.0755156, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'רמת מנשה', en: 'Ramot Menashe' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: בפרואר-מרץ\nפריחת רקפות' },
  { id: 30, lat: 32.3637125, lng: 34.8645156, species: { he: 'נרקיסים', en: 'Narcissus' }, location: { he: 'ביתן אהרון', en: 'Bitan Aharon' }, season: { he: 'נובמבר–פברואר', en: 'November–February' }, description: 'פריחה: נובמבר-פברואר\nביתן אהרון' },
  { id: 31, lat: 31.3713125, lng: 34.8253125, species: { he: 'חלמניות', en: 'Sternbergia' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'נובמבר–דצמבר', en: 'November–December' }, description: 'פריחה: נובמבר-דצמבר\nפריחת חלמניות' },
  { id: 32, lat: 32.5397375, lng: 34.9172344, species: { he: 'סתוונית', en: 'Autumn Crocus' }, location: { he: 'גבעת האשחרים', en: 'Ashcharim Hill' }, season: { he: 'אוקטובר–דצמבר', en: 'October–December' }, description: 'פריחה: אוקטובר-דצמבר\nגבעת האשחרים', image: 'https://mymaps.usercontent.google.com/hostedimage/m/*/3AL_Y2X5YCzlrJ2-8iEIZ--fsADH2kytZT8plsEJ9-B8_yFfVIeq90AQUespFASaehcVJg5YEdAbdZ-9fHSYUpZsLsBxTao_PkytOdLgIyddhgxKVv_Qivchqqr0E3yltI-Cqrw6PkvR7goGwGkdSPmcFt4z7MWrmddjZ1cfvTisciNEvAPBDvwYZlGo9oYM-BM6KOvkFrFJBDNvyrs-Mv7vTdLs5Qf3c-1uhroUaJJIiRUaCDc7aDd2LGbyLNSI?fife=s16383' },
  { id: 33, lat: 31.9408625, lng: 34.8096094, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'מרכז הארץ', en: 'Central Israel' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nשדה פרגים' },
  { id: 34, lat: 32.7081762, lng: 34.946233, species: { he: 'חצבים', en: 'Sea Squill' }, location: { he: 'חורשת לימור', en: 'Limor Grove' }, season: { he: 'ספטמבר–אוקטובר', en: 'September–October' }, description: 'פריחה: ספטמבר - אוקטובר\nחורשת לימור פריחת חצבים' },
  { id: 35, lat: 32.6043125, lng: 35.3838125, species: { he: 'תורמוסים', en: 'Lupines' }, location: { he: 'שמורת תורמוס ההרים, נעורה', en: 'Mountain Lupine Reserve, Naura' }, season: { he: 'ינואר–פברואר', en: 'January–February' }, description: 'פריחה: ינואר-פברואר\nשמורת תורמוס ההרים, נעורה' },
  { id: 36, lat: 31.6940625, lng: 35.0099844, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'שפלת יהודה', en: 'Judean Foothills' }, season: { he: 'מרץ–מאי', en: 'March–May' }, description: 'פריחה: מרץ–מאי\nפריחת פרגים' },
  { id: 37, lat: 32.6367125, lng: 35.3432344, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'עמק יזרעאל', en: 'Jezreel Valley' }, season: { he: 'מרץ–מאי', en: 'March–May' }, description: 'פריחה: מרץ–מאי\nשדה פרגים' },
  { id: 38, lat: 31.4983364, lng: 34.719248, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nפריחת כלניות' },
  { id: 39, lat: 31.5006125, lng: 34.6997344, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'בתרונות רוחמה', en: 'Batronot Ruhama' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nבתרונות רוחמה' },
  { id: 40, lat: 32.5737375, lng: 35.0748281, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'רמת מנשה', en: 'Ramot Menashe' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nפריחת רקפות' },
  { id: 41, lat: 32.665453, lng: 35.2278499, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'יער מסריק', en: 'Mesrik Forest' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nיער מסריק' },
  { id: 42, lat: 32.6886875, lng: 35.2394375, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'שביל הרקפות', en: 'Cyclamen Trail' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nשביל הרקפות' },
  { id: 43, lat: 32.5924375, lng: 35.2353125, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'שביל הכלניות מנחת מגידו', en: 'Anemone Trail, Megiddo' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nשביל הכלניות מנחת מגידו' },
  { id: 44, lat: 32.6411375, lng: 35.0979531, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'עמק השלום, יוקנעם', en: 'Peace Valley, Yokneam' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nבעמק השלום מאחורי ביג יוקנעם', image: 'https://mymaps.usercontent.google.com/hostedimage/m/*/3AL_Y2X4BDjQSD-MAdouvwWmjuo4TettpZx-2Xa6SsmFSlaCmQyaWdZtiunaUV26AyMzBNFF9glRf8ptqExPoTyFEEYslv4vqIyzTgA9WNYJebTqImWNTASsAdY8oB7KLjoGuQ-3CQOPMiCuCEqJa2urzKkajDDHihWLIuR0aNAnejemfQ6du_VMoY1o7OaY9LKTdsg6frxTrEi_5qcWjrwdOuKkOJTaW5I7bwjQkkO-ls6LE6OTfKDxbLMIlhRc?fife=s16383' },
  { id: 45, lat: 32.6072375, lng: 35.0750156, species: { he: 'תורמוסים', en: 'Lupines' }, location: { he: 'רמת מנשה', en: 'Ramot Menashe' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nשדה תורמוסים', image: 'https://mymaps.usercontent.google.com/hostedimage/m/*/3AL_Y2X49eGEkafo05D7_ldGx0zvKlB7L6d4SNg2HDTJHeCC85z5Aqk2eKKCzxHQz3GaX3ajHFeR2jR7zUeyLxWhfkyXOeROSYk4AdhJEzVG1dzlECEtYrsk4Ucfq72rDEqm0pR7HoRa8BfVnF_52m48y8b66TMe8UA6SZ8nM5Sp14EHrAkmRBmrLrrLV69f2YGNh78uIRfLcrbqSIpSGyeAns88lol54A3JUus4CgwflHr9zF3TETxbiq3d4QeM?fife=s16383' },
  { id: 46, lat: 32.5262375, lng: 35.0486406, species: { he: 'כלניות, רקפות', en: 'Anemones & Cyclamen' }, location: { he: 'מול רגבים', en: 'Near Regavim' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nמול רגבים, חונים על הכביש ועוברים את הגדר' },
  { id: 47, lat: 31.425582, lng: 34.510044, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'מרץ–מאי', en: 'March–May' }, description: 'פריחה: מרץ–מאי\nפריחת פרגים' },
  { id: 48, lat: 32.7040625, lng: 35.1290625, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'גליל תחתון', en: 'Lower Galilee' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nפריחת כלניות' },
  { id: 49, lat: 32.7758125, lng: 35.4146719, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'מול יער לביא', en: 'Near Lavi Forest' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nמול יער לביא' },
  { id: 50, lat: 32.7800625, lng: 35.4185469, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'יער לביא, צומת גולני', en: 'Lavi Forest, Golani Junction' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nיער לביא ליד צומת גולני' },
  { id: 51, lat: 31.8228125, lng: 34.7773125, species: { he: 'תורמוסים', en: 'Lupines' }, location: { he: 'שפלה', en: 'Shephelah' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: פברואר-מרץ\nפריחת תורמוסים' },
  { id: 52, lat: 31.6545625, lng: 34.9957031, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'שפלת יהודה', en: 'Judean Foothills' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ\nשדה פריחת פרגים' },
  { id: 53, lat: 31.5865125, lng: 34.8137656, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'מרץ–מאי', en: 'March–May' }, description: 'פריחה: מרץ–מאי\nשדה פריחת פרגים' },
  { id: 54, lat: 31.5901125, lng: 34.8137344, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'מרץ–מאי', en: 'March–May' }, description: 'פריחה: מרץ–מאי\nשדה פריחת פרגים' },
  { id: 55, lat: 31.5929125, lng: 34.8149531, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'מרץ–מאי', en: 'March–May' }, description: 'פריחה: מרץ–מאי\nפריחת פרגים' },
  { id: 56, lat: 31.6041125, lng: 34.8336094, species: { he: 'רקפות', en: 'Cyclamen' }, location: { he: 'יער המלאכים', en: 'Angels Forest' }, season: { he: 'דצמבר–מרץ', en: 'December–March' }, description: 'פריחה: דצמבר–מרץ\nיער המלאכים' },
  { id: 57, lat: 32.8341875, lng: 35.2768281, species: { he: 'חצבים', en: 'Sea Squill' }, location: { he: 'תל יודפת', en: 'Tel Yodfat' }, season: { he: 'ספטמבר–אוקטובר', en: 'September–October' }, description: 'פריחה: ספטמבר - אוקטובר\nתל יודפת' },
  { id: 58, lat: 31.4453674, lng: 34.5224568, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'באר מרווה', en: 'Be\'er Marva' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nבאר מרווה' },
  { id: 59, lat: 32.7340193, lng: 35.1714477, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'חניון אלוני אבא', en: 'Allonei Abba Parking' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nחניון אלוני אבא' },
  { id: 60, lat: 32.6841875, lng: 35.3843125, species: { he: 'חלמוניות', en: 'Sternbergia' }, location: { he: 'שביל החלמוניות, הר תבור', en: 'Sternbergia Trail, Mt. Tabor' }, season: { he: 'נובמבר–דצמבר', en: 'November–December' }, description: 'פריחה: נובמבר-דצמבר\nשביל החלמוניות בהר תבור' },
  { id: 61, lat: 31.5653125, lng: 34.9311875, species: { he: 'תורמוסים', en: 'Lupines' }, location: { he: 'צפון הנגב', en: 'Northern Negev' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: בפרואר - מרץ\nפריחת תורמוסים' },
  { id: 62, lat: 31.7503125, lng: 34.9754375, species: { he: 'כלניות', en: 'Anemones' }, location: { he: 'שפלת יהודה', en: 'Judean Foothills' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר-מרץ' },
  { id: 63, lat: 31.7694375, lng: 35.1119375, species: { he: 'פרגים, רקפות, חרציות, אירוסים', en: 'Poppies, Cyclamen, Chrysanthemums & Irises' }, location: { he: 'הרי ירושלים', en: 'Jerusalem Hills' }, season: { he: 'ינואר–מרץ', en: 'January–March' }, description: 'פריחה: ינואר–מרץ\nפריחות מרשימות בעונה' },
  // New entry: אירוסים at חוף גדור
  { id: 64, lat: 32.4282743, lng: 34.8782255, species: { he: 'אירוסים', en: 'Irises' }, location: { he: 'חוף גדור', en: 'Hof Gador' }, season: { he: 'פברואר–מרץ', en: 'February–March' }, description: 'פריחה: פברואר - מרץ\nצמוד לחוף גדור' },
  // Entries without descriptions (nodesc markers)
  { id: 65, lat: 32.5656856, lng: 34.917901, species: { he: 'צבעוני', en: 'Tulip' }, location: { he: 'מעגן מיכאל', en: "Ma'agan Michael" }, season: { he: 'אפריל–מאי', en: 'April–May' } },
  { id: 66, lat: 32.5398239, lng: 34.9161382, species: { he: 'סתוונית', en: 'Autumn Crocus' }, location: { he: 'גבעת האשחרים', en: 'Ashcharim Hill' }, season: { he: 'אוקטובר–נובמבר', en: 'October–November' } },
  { id: 67, lat: 32.5263733, lng: 35.0497603, species: { he: 'כלניות, רקפות', en: 'Anemones & Cyclamen' }, location: { he: 'רמת מנשה', en: 'Ramot Menashe' }, season: { he: 'ינואר–מרץ', en: 'January–March' } },
  { id: 68, lat: 32.5263733, lng: 35.0497603, species: { he: 'כלניות, רקפות', en: 'Anemones & Cyclamen' }, location: { he: 'רמת מנשה', en: 'Ramot Menashe' }, season: { he: 'ינואר–מרץ', en: 'January–March' } },
  { id: 69, lat: 32.1657297, lng: 34.9148473, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'מרכז הארץ', en: 'Central Israel' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nפריחת פרגים וחרציות לייד הרכבת', image: pargimTrainNew },
  { id: 70, lat: 31.8992902, lng: 34.7835516, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'בין רחובות לנס ציונה', en: 'Between Rehovot and Ness Ziona' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nפריחת פרגים וחרציות בין רחובות לנס ציונה', image: pargimRehovot },
  { id: 71, lat: 31.9030044, lng: 34.7837554, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'בין רחובות לנס ציונה', en: 'Between Rehovot and Ness Ziona' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nפריחת פרגים וחרציות בין רחובות לנס ציונה', image: pargimRehovot },
  { id: 72, lat: 32.5889243, lng: 35.036524, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'עמק יזרעאל', en: 'Jezreel Valley' }, season: { he: 'פברואר–אפריל', en: 'February–April' }, description: 'פריחה: פברואר-אפריל\nמול עץ הברוש הענק', image: pargimCypress },
  { id: 73, lat: 31.81139, lng: 34.97717, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'דרך בורמה', en: 'Burma Road' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nעל דרך בורמה בצידי הדרך', image: burmaRoad1 },
  { id: 74, lat: 31.81204, lng: 34.98076, species: { he: 'פרגים', en: 'Poppies' }, location: { he: 'דרך בורמה', en: 'Burma Road' }, season: { he: 'מרץ–אפריל', en: 'March–April' }, description: 'פריחה: מרץ - אפריל\nעל דרך בורמה בצידי הדרך', image: burmaRoad2 },
];

// Color mapping for species markers
export const speciesColors: Record<string, string> = {
  'כלניות': '#DD3121',
  'רקפות': '#DAB1D1',
  'פרגים': '#DD3121',
  'תורמוסים': '#6463B1',
  'נרקיסים': '#E9BF1B',
  'צבעוני': '#DD3121',
  'חלמוניות': '#E9BF1B',
  'חלמניות': '#E9BF1B',
  'אדמונית החורש': '#DD3121',
  'יקינטון': '#6463B1',
  'שקדיות': '#DAB1D1',
  'אירוסים': '#6463B1',
  'שושן צחור': '#F4F3E8',
  'סתוונית': '#DAB1D1',
  'חצבים': '#F4F3E8',
  'כרכום': '#E9BF1B',
  'חרציות': '#E9BF1B',
  'חמנייה': '#E9BF1B',
  'חמניות': '#E9BF1B',
};

// Extra hand-curated sightings appended to live KML data
export const extraSightings: Sighting[] = [];

export const getPrimarySpecies = (speciesHe: string): string => {
  return speciesHe.includes(',') ? speciesHe.split(',')[0].trim() : speciesHe;
};
