import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, Shield, ShieldOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import BottomNav from '@/components/BottomNav';
import AppFooter from '@/components/AppFooter';

import kalanitImg from '@/assets/species/kalanit.png';
import irisImg from '@/assets/species/iris.png';
import tzivoniImg from '@/assets/species/tzivoni.png';
import narkisImg from '@/assets/species/narkis.png';
import paregImg from '@/assets/species/pareg.png';
import karkomImg from '@/assets/species/karkom.png';
import chalmonitImg from '@/assets/species/chalmonit.png';
import chatzavImg from '@/assets/species/chatzav.png';
import admonitImg from '@/assets/species/admonit.png';
import stavvanitImg from '@/assets/species/stavvanit.png';
import rakefetImg from '@/assets/species/rakefet.png';
import shoshanImg from '@/assets/species/shoshan.png';
import turmusImg from '@/assets/species/turmus.png';
import chamaniyaImg from '@/assets/species/chamaniya.png';

const speciesData = [
  {
    id: 'anemone-coronaria',
    hebrewName: 'כלנית',
    englishName: 'Crown Anemone',
    latinName: 'Anemone coronaria',
    color: 'red',
    colorHe: 'אדום',
    season: 'Jan-Mar',
    seasonHe: 'ינואר-מרץ',
    protected: true,
    image: kalanitImg,
  },
  {
    id: 'iris-mariae',
    hebrewName: 'אירוס',
    englishName: 'Iris',
    latinName: 'Iris mariae',
    color: 'purple',
    colorHe: 'סגול',
    season: 'Feb-Mar',
    seasonHe: 'פברואר-מרץ',
    protected: true,
    image: irisImg,
  },
  {
    id: 'tulipa-agenensis',
    hebrewName: 'צבעוני',
    englishName: 'Mountain Tulip',
    latinName: 'Tulipa agenensis',
    color: 'red',
    colorHe: 'אדום',
    season: 'Feb-Mar',
    seasonHe: 'פברואר-מרץ',
    protected: true,
    image: tzivoniImg,
  },
  {
    id: 'narcissus-tazetta',
    hebrewName: 'נרקיס',
    englishName: 'Narcissus',
    latinName: 'Narcissus tazetta',
    color: 'white',
    colorHe: 'לבן',
    season: 'Nov-Feb',
    seasonHe: 'נובמבר-פברואר',
    protected: true,
    image: narkisImg,
  },
  {
    id: 'papaver-umbonatum',
    hebrewName: 'פרג',
    englishName: 'Poppy',
    latinName: 'Papaver umbonatum',
    color: 'red',
    colorHe: 'אדום',
    season: 'Mar-May',
    seasonHe: 'מרץ-מאי',
    protected: false,
    image: paregImg,
  },
  {
    id: 'crocus-hyemalis',
    hebrewName: 'כרכום חורפי',
    englishName: 'Winter Crocus',
    latinName: 'Crocus hyemalis',
    color: 'white',
    colorHe: 'לבן',
    season: 'Sep-Nov',
    seasonHe: 'ספטמבר-נובמבר',
    protected: true,
    image: karkomImg,
  },
  {
    id: 'sternbergia-clusiana',
    hebrewName: 'חלמונית',
    englishName: 'Sternbergia',
    latinName: 'Sternbergia clusiana',
    color: 'yellow',
    colorHe: 'צהוב',
    season: 'Nov-Dec',
    seasonHe: 'נובמבר-דצמבר',
    protected: true,
    image: chalmonitImg,
  },
  {
    id: 'urginea-maritima',
    hebrewName: 'חצב',
    englishName: 'Sea Squill',
    latinName: 'Urginea maritima',
    color: 'white',
    colorHe: 'לבן',
    season: 'Aug-Oct',
    seasonHe: 'אוגוסט-אוקטובר',
    protected: true,
    image: chatzavImg,
  },
  {
    id: 'paeonia-mascula',
    hebrewName: 'אדמונית החורש',
    englishName: 'Woodland Peony',
    latinName: 'Paeonia mascula',
    color: 'red',
    colorHe: 'אדום',
    season: 'Mar-Apr',
    seasonHe: 'מרץ-אפריל',
    protected: true,
    image: admonitImg,
  },
  {
    id: 'colchicum-stevenii',
    hebrewName: 'סתוונית',
    englishName: 'Autumn Crocus',
    latinName: 'Colchicum stevenii',
    color: 'pink',
    colorHe: 'ורוד',
    season: 'Oct-Dec',
    seasonHe: 'אוקטובר-דצמבר',
    protected: true,
    image: stavvanitImg,
  },
  {
    id: 'cyclamen-persicum',
    hebrewName: 'רקפת',
    englishName: 'Cyclamen',
    latinName: 'Cyclamen persicum',
    color: 'pink',
    colorHe: 'ורוד',
    season: 'Dec-Mar',
    seasonHe: 'דצמבר-מרץ',
    protected: true,
    image: rakefetImg,
  },
  {
    id: 'lilium-candidum',
    hebrewName: 'שושן צחור',
    englishName: 'White Lily',
    latinName: 'Lilium candidum',
    color: 'white',
    colorHe: 'לבן',
    season: 'May-Jun',
    seasonHe: 'מאי-יוני',
    protected: true,
    image: shoshanImg,
  },
  {
    id: 'lupinus-pilosus',
    hebrewName: 'תורמוס',
    englishName: 'Blue Lupine',
    latinName: 'Lupinus pilosus',
    color: 'blue',
    colorHe: 'כחול',
    season: 'Feb-Mar',
    seasonHe: 'פברואר-מרץ',
    protected: true,
    image: turmusImg,
  },
  {
    id: 'helianthus-annuus',
    hebrewName: 'חמנייה',
    englishName: 'Sunflower',
    latinName: 'Helianthus annuus',
    color: 'yellow',
    colorHe: 'צהוב',
    season: 'May-Jun',
    seasonHe: 'מאי-יוני',
    protected: false,
    image: chamaniyaImg,
  },
];
const colorFilters = [
  { id: 'all', he: 'הכל', en: 'All', color: 'bg-muted' },
  { id: 'red', he: 'אדום', en: 'Red', color: 'bg-red-500' },
  { id: 'pink', he: 'ורוד', en: 'Pink', color: 'bg-pink-400' },
  { id: 'yellow', he: 'צהוב', en: 'Yellow', color: 'bg-yellow-400' },
  { id: 'purple', he: 'סגול', en: 'Purple', color: 'bg-purple-500' },
  { id: 'blue', he: 'כחול', en: 'Blue', color: 'bg-blue-500' },
  { id: 'white', he: 'לבן', en: 'White', color: 'bg-white border border-border' },
];

const Species = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState('all');
  const [showProtectedOnly, setShowProtectedOnly] = useState(false);

  const filteredSpecies = speciesData.filter((species) => {
    const matchesSearch =
      species.hebrewName.includes(searchQuery) ||
      species.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.latinName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesColor = selectedColor === 'all' || species.color === selectedColor;
    const matchesProtected = !showProtectedOnly || species.protected;
    
    return matchesSearch && matchesColor && matchesProtected;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 bg-muted border-0"
            />
          </div>
        </div>
        
        {/* Color Filters */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto">
          {colorFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedColor(filter.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedColor === filter.id
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${filter.color}`} />
              {language === 'he' ? filter.he : filter.en}
            </button>
          ))}
        </div>
      </header>

      {/* Species Grid */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredSpecies.length} {language === 'he' ? 'מינים' : 'species'}
          </p>
          <Button
            variant={showProtectedOnly ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setShowProtectedOnly(!showProtectedOnly)}
            className="gap-1"
          >
            <Shield className="w-4 h-4" />
            {language === 'he' ? 'מוגנים' : 'Protected'}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredSpecies.map((species, index) => (
            <motion.div
              key={species.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/species/${species.id}`}>
                <Card variant="nature" className="overflow-hidden h-full">
                  <div className="aspect-square relative flex items-center justify-center bg-card p-4">
                    <img
                      src={species.image}
                      alt={language === 'he' ? species.hebrewName : species.englishName}
                      className="max-w-[85%] max-h-[85%] object-contain"
                    />
                    {species.protected && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-leaf text-primary-foreground gap-1">
                          <Shield className="w-3 h-3" />
                          {language === 'he' ? 'מוגן' : 'Protected'}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold text-foreground text-sm leading-tight">
                      {language === 'he' ? species.hebrewName : species.englishName}
                    </h3>
                    <p className="text-xs text-muted-foreground italic mt-0.5">
                      {species.latinName}
                    </p>
                    <p className="text-xs text-primary mt-1">
                      🌸 {language === 'he' ? species.seasonHe : species.season}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <AppFooter />
      <BottomNav />
    </div>
  );
};

export default Species;
