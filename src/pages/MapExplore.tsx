import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search, X, Locate, Navigation, Flower, Share2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import BottomNav from '@/components/BottomNav';
import SEO from '@/components/SEO';

import { speciesColors, getPrimarySpecies, getSightingImage, getSightingFallbackImage, getNextSightingImage, type Sighting } from '@/data/sightings';
import { useSightings } from '@/hooks/useSightings';

// Israel center and bounds
const israelCenter: L.LatLngTuple = [31.5, 35.0];
const israelBounds: L.LatLngBoundsExpression = [
  [29.5, 34.2],
  [33.3, 35.9],
];

// Create colored flower marker icon
const isLightColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
};

const createFlowerIcon = (speciesHe: string) => {
  const primary = getPrimarySpecies(speciesHe);
  const color = speciesColors[primary] || '#E91E63';
  const iconFill = isLightColor(color) ? '#131311' : 'white';
  return L.divIcon({
    className: 'custom-flower-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
        background: ${color};
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="18" height="12" viewBox="0 0 53 37" fill="${iconFill}" xmlns="http://www.w3.org/2000/svg"><path d="M52.2711 10.855C52.2791 10.023 51.6671 9.316 50.8421 9.207C49.5301 9.029 48.4161 8.947 47.3421 8.947C43.7461 8.947 40.3141 9.687 37.1861 11.017C34.9011 6.546 31.3271 2.747 26.9591 0.222C26.4491 -0.074 25.8191 -0.074 25.3091 0.222C20.9451 2.748 17.3701 6.547 15.0821 11.017C11.9551 9.685 8.5221 8.947 4.9281 8.947C3.8501 8.947 2.7391 9.029 1.4261 9.207C0.604098 9.318 -0.00890217 10.025 9.78257e-05 10.855C0.123098 23.441 9.2541 33.953 21.1931 36.265C21.1931 36.265 23.7002 37 26.1001 37C28.5 37 31.0761 36.263 31.0761 36.263C43.0161 33.951 52.1471 23.439 52.2711 10.855ZM26.1351 3.574C29.5751 5.767 32.3971 8.88 34.2481 12.497C31.0571 14.361 28.2891 16.881 26.1351 19.871C23.9801 16.881 21.2131 14.359 18.0201 12.496C19.8731 8.88 22.6951 5.767 26.1351 3.574ZM3.3571 12.308C3.9101 12.263 4.4261 12.242 4.9281 12.242C13.0231 12.242 20.1681 16.527 24.2301 22.939C22.6271 25.966 21.6041 29.339 21.3051 32.914C11.5921 30.795 4.1161 22.463 3.3571 12.308ZM26.1351 33.447C26.1231 33.447 26.1121 33.447 26.1001 33.447C25.5821 33.445 25.0741 33.408 24.5651 33.373C24.7421 31.019 25.2941 28.771 26.1351 26.669C26.9771 28.772 27.5281 31.02 27.7051 33.372C27.1841 33.408 26.6641 33.447 26.1351 33.447ZM30.9651 32.912C30.6661 29.338 29.6431 25.966 28.0391 22.939C32.1001 16.525 39.2461 12.24 47.3421 12.24C47.8441 12.24 48.3611 12.261 48.9121 12.306C48.1531 22.462 40.6761 30.795 30.9651 32.912Z"/></svg>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

// User location icon
const userLocationIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #3B82F6;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
    "></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const hebrewMonthNames = ['', 'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
const englishMonthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Mapping from sighting species (Hebrew) to bloom months
const sightingSpeciesMonths: Record<string, number[]> = {
  'כלניות': [1, 2, 3],
  'רקפות': [12, 1, 2, 3],
  'פרגים': [3, 4, 5],
  'תורמוסים': [2, 3],
  'נרקיסים': [11, 12, 1, 2],
  'צבעוני': [2, 3],
  'חלמוניות': [11, 12],
  'חלמניות': [11, 12],
  'אדמונית החורש': [3, 4],
  'יקינטון': [4, 5, 6],
  'שקדיות': [1, 2],
  'אירוסים': [2, 3],
  'שושן צחור': [5, 6],
  'סתוונית': [10, 11, 12],
  'חצבים': [8, 9, 10],
  'חמנייה': [5, 6],
  'חמניות': [5, 6],
};

const sightingBloomsInMonth = (speciesHe: string, month: number): boolean => {
  const parts = speciesHe.split(',').map(s => s.trim());
  return parts.some(part => sightingSpeciesMonths[part]?.includes(month));
};

// Region mapping for sightings
const getRegion = (lat: number): string => {
  if (lat >= 32.5) return 'north';
  if (lat >= 31.5) return 'center';
  return 'south';
};

const regionLabels: Record<string, { he: string; en: string }> = {
  'all': { he: 'כל האזורים', en: 'All Regions' },
  'north': { he: 'צפון', en: 'North' },
  'center': { he: 'מרכז', en: 'Center' },
  'south': { he: 'דרום', en: 'South' },
};

// Species filter: map species detail page IDs to sighting Hebrew names
const speciesIdToSightingNames: Record<string, string[]> = {
  'anemone-coronaria': ['כלניות'],
  'iris-mariae': ['אירוסים'],
  'tulipa-agenensis': ['צבעוני'],
  'narcissus-tazetta': ['נרקיסים'],
  'papaver-umbonatum': ['פרגים'],
  'crocus-hyemalis': ['כרכום'],
  'sternbergia-clusiana': ['חלמוניות', 'חלמניות'],
  'urginea-maritima': ['חצבים'],
  'paeonia-mascula': ['אדמונית החורש'],
  'colchicum-stevenii': ['סתוונית'],
  'cyclamen-persicum': ['רקפות'],
  'lilium-candidum': ['שושן צחור'],
  'lupinus-pilosus': ['תורמוסים'],
  'helianthus-annuus': ['חמנייה', 'חמניות'],
};

const speciesFilterOptions: { id: string; he: string; en: string }[] = [
  { id: 'all', he: 'כל הפרחים', en: 'All Flowers' },
  { id: 'anemone-coronaria', he: 'כלנית', en: 'Anemone' },
  { id: 'iris-mariae', he: 'אירוס', en: 'Iris' },
  { id: 'tulipa-agenensis', he: 'צבעוני', en: 'Tulip' },
  { id: 'narcissus-tazetta', he: 'נרקיס', en: 'Narcissus' },
  { id: 'papaver-umbonatum', he: 'פרג', en: 'Poppy' },
  { id: 'sternbergia-clusiana', he: 'חלמונית', en: 'Sternbergia' },
  { id: 'urginea-maritima', he: 'חצב', en: 'Sea Squill' },
  { id: 'paeonia-mascula', he: 'אדמונית', en: 'Peony' },
  { id: 'colchicum-stevenii', he: 'סתוונית', en: 'Autumn Crocus' },
  { id: 'cyclamen-persicum', he: 'רקפת', en: 'Cyclamen' },
  { id: 'lilium-candidum', he: 'שושן צחור', en: 'White Lily' },
  { id: 'lupinus-pilosus', he: 'תורמוס', en: 'Lupine' },
  { id: 'helianthus-annuus', he: 'חמנייה', en: 'Sunflower' },
];

const matchesSpeciesFilter = (sightingSpeciesHe: string, speciesFilterId: string): boolean => {
  if (speciesFilterId === 'all') return true;
  const names = speciesIdToSightingNames[speciesFilterId];
  if (!names) return false;
  const parts = sightingSpeciesHe.split(',').map(s => s.trim());
  return parts.some(part => names.includes(part));
};

const timeFilterLabels: Record<string, { he: string; en: string }> = {
  'all': { he: 'כל החודשים', en: 'All Months' },
  'current': { he: 'פורח עכשיו', en: 'Blooming Now' },
};

const MapExplore = () => {
  const { language, t } = useLanguage();
  const { sightings: sightingsData, loading: sightingsLoading } = useSightings();
  const [searchParams, setSearchParams] = useSearchParams();
  const speciesFilterParam = searchParams.get('species') || 'all';
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null);
  const [userLocation, setUserLocation] = useState<L.LatLngTuple | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [speciesFilter, setSpeciesFilter] = useState(speciesFilterParam);
  const [timeFilter, setTimeFilter] = useState('all');
  const hasAutoSelected = useRef(false);
  // Filter sightings based on search, month, region, color, time
  const filteredSightings = sightingsData.filter((sighting) => {
    // Month filter from URL param
    const monthFilter = searchParams.get('month') ? Number(searchParams.get('month')) : null;
    if (monthFilter && !sightingBloomsInMonth(sighting.species.he, monthFilter)) {
      return false;
    }
    // Region filter
    if (regionFilter !== 'all' && getRegion(sighting.lat) !== regionFilter) {
      return false;
    }
    // Species filter
    if (!matchesSpeciesFilter(sighting.species.he, speciesFilter)) {
      return false;
    }
    // Time filter (blooming now)
    if (timeFilter === 'current') {
      const currentMonth = new Date().getMonth() + 1;
      if (!sightingBloomsInMonth(sighting.species.he, currentMonth)) {
        return false;
      }
    }
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      sighting.species.he.includes(query) ||
      sighting.species.en.toLowerCase().includes(query) ||
      sighting.location.he.includes(query) ||
      sighting.location.en.toLowerCase().includes(query)
    );
  });

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: israelCenter,
      zoom: 8,
      minZoom: 7,
      maxZoom: 18,
      maxBounds: israelBounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b', 'c'],
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when sightings change
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    filteredSightings.forEach((sighting) => {
      const marker = L.marker([sighting.lat, sighting.lng], {
        icon: createFlowerIcon(sighting.species.he),
      })
        .addTo(mapRef.current!)
        .on('click', () => setSelectedSighting(sighting));

      markersRef.current.push(marker);
    });
  }, [filteredSightings, language]);

  // Update user location marker
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    userMarkerRef.current = L.marker(userLocation, {
      icon: userLocationIcon,
    }).addTo(mapRef.current);
  }, [userLocation]);

  // Auto-select sighting from URL params (e.g. ?sighting=5)
  useEffect(() => {
    if (hasAutoSelected.current || sightingsLoading) return;
    const sightingId = searchParams.get('sighting');
    if (sightingId) {
      const target = sightingsData.find(s => String(s.id) === sightingId);
      if (target && mapRef.current) {
        hasAutoSelected.current = true;
        setSelectedSighting(target);
        mapRef.current.flyTo([target.lat, target.lng], 14, { duration: 1.5 });
      }
    }
  }, [sightingsData, sightingsLoading, searchParams]);

  const flyToUserLocation = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.flyTo(userLocation, 13, { duration: 1.5 });
    }
  };

  const shareSighting = async (sighting: Sighting) => {
    const url = `${window.location.origin}/map?sighting=${sighting.id}`;
    const text = `${sighting.species.he} - ${sighting.location.he}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      // Simple feedback
      alert(language === 'he' ? 'הקישור הועתק!' : 'Link copied!');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="מפת פריחה | Bloom Finder Israel"
        description="מפה אינטראקטיבית של אתרי פריחה בישראל עם מיקומים מדויקים."
        path="/map"
      />
      {/* Header */}
      <header className="sticky top-0 z-[1001] bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-2 px-4 h-14">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/app">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('search')}
              className="pl-9 h-9 bg-muted border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant={showFilters ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Species filter badge */}
        {speciesFilter !== 'all' && (
          <div className="px-4 py-2 border-t border-border bg-primary/10 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {language === 'he' 
                ? `מציג: ${speciesFilterOptions.find(o => o.id === speciesFilter)?.he || ''}`
                : `Showing: ${speciesFilterOptions.find(o => o.id === speciesFilter)?.en || ''}`}
            </span>
            <Button variant="ghost" size="sm" onClick={() => setSpeciesFilter('all')}>
              <X className="w-4 h-4" />
              {language === 'he' ? 'נקה' : 'Clear'}
            </Button>
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border bg-card"
          >
            <div className="p-4 space-y-3">
              {/* Region filter */}
              <div className="flex gap-2 overflow-x-auto">
                {Object.entries(regionLabels).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={regionFilter === key ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() => setRegionFilter(key)}
                  >
                    {language === 'he' ? label.he : label.en}
                  </Button>
                ))}
              </div>
              {/* Species filter */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {speciesFilterOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={speciesFilter === option.id ? 'default' : 'secondary'}
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => setSpeciesFilter(option.id)}
                  >
                    {language === 'he' ? option.he : option.en}
                  </Button>
                ))}
              </div>
              {/* Time filter */}
              <div className="flex gap-2 overflow-x-auto">
                {Object.entries(timeFilterLabels).map(([key, label]) => (
                  <Button
                    key={key}
                    variant={timeFilter === key ? 'default' : 'secondary'}
                    size="sm"
                    onClick={() => setTimeFilter(key)}
                  >
                    {language === 'he' ? label.he : label.en}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-8rem)]">
        <div ref={mapContainerRef} className="h-full w-full z-0" />
        
        {/* Map controls */}
        <div className="absolute top-4 right-4 z-[1000]">
          <Button
            variant="secondary"
            size="icon"
            onClick={flyToUserLocation}
            className="bg-card shadow-medium"
            disabled={!userLocation}
          >
            <Locate className="w-5 h-5" />
          </Button>
        </div>

      {/* Sightings count badge */}
        <div className="absolute bottom-20 left-4 z-[1000]">
          <Card variant="glass" className="px-3 py-2">
            <p className="text-sm font-medium">
              {filteredSightings.length} {language === 'he' ? 'תצפיות' : 'sightings'}
            </p>
          </Card>
        </div>

        {/* Blooming Now button */}
        <div className="absolute bottom-20 right-4 z-[1000]">
          <Button variant="nature" size="sm" className="gap-2 shadow-lg" asChild>
            <Link to="/blooming">
              <Flower className="w-4 h-4" />
              {language === 'he' ? 'פורח עכשיו' : 'Blooming Now'}
            </Link>
          </Button>
        </div>
      </div>

      {/* Selected Sighting Card */}
      {selectedSighting && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-[1001]"
        >
          <Card variant="glass" className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-foreground">
                    {selectedSighting.species[language]}
                  </h3>
                  {selectedSighting.description && (
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                      {selectedSighting.description}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => setSelectedSighting(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="w-full h-32 rounded-lg overflow-hidden mt-2">
                <img 
                  src={getSightingImage(selectedSighting)} 
                  alt={selectedSighting.species[language]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    const currentSrc = img.src;
                    const next = getNextSightingImage(selectedSighting, currentSrc);
                    if (next) {
                      img.src = next;
                    } else {
                      const fallback = getSightingFallbackImage(selectedSighting);
                      if (currentSrc !== fallback) {
                        img.src = fallback;
                      }
                    }
                  }}
                />
              </div>
              <div className="flex gap-2 mt-2">
                <a
                  href={`https://waze.com/ul?ll=${selectedSighting.lat},${selectedSighting.lng}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="nature" size="sm" className="w-full gap-1 text-xs">
                    <Navigation className="w-3 h-3" />
                    נווט עם Waze
                  </Button>
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedSighting.lat},${selectedSighting.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="secondary" size="sm" className="w-full gap-1 text-xs">
                    <Navigation className="w-3 h-3" />
                    Google Maps
                  </Button>
                </a>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-1 text-xs"
                  onClick={() => shareSighting(selectedSighting)}
                >
                  <Share2 className="w-3 h-3" />
                  {language === 'he' ? 'שתף' : 'Share'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      
      <BottomNav />
    </div>
  );
};

export default MapExplore;
