import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Flower } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    months: [1, 2, 3],
    protected: true,
    image: kalanitImg,
  },
  {
    id: 'iris-mariae',
    hebrewName: 'אירוס',
    englishName: 'Iris',
    latinName: 'Iris mariae',
    months: [2, 3],
    protected: true,
    image: irisImg,
  },
  {
    id: 'tulipa-agenensis',
    hebrewName: 'צבעוני',
    englishName: 'Mountain Tulip',
    latinName: 'Tulipa agenensis',
    months: [2, 3],
    protected: true,
    image: tzivoniImg,
  },
  {
    id: 'narcissus-tazetta',
    hebrewName: 'נרקיס',
    englishName: 'Narcissus',
    latinName: 'Narcissus tazetta',
    months: [11, 12, 1, 2],
    protected: true,
    image: narkisImg,
  },
  {
    id: 'papaver-umbonatum',
    hebrewName: 'פרג',
    englishName: 'Poppy',
    latinName: 'Papaver umbonatum',
    months: [3, 4, 5],
    protected: false,
    image: paregImg,
  },
  {
    id: 'crocus-hyemalis',
    hebrewName: 'כרכום חורפי',
    englishName: 'Winter Crocus',
    latinName: 'Crocus hyemalis',
    months: [9, 10, 11],
    protected: true,
    image: karkomImg,
  },
  {
    id: 'sternbergia-clusiana',
    hebrewName: 'חלמונית',
    englishName: 'Sternbergia',
    latinName: 'Sternbergia clusiana',
    months: [11, 12],
    protected: true,
    image: chalmonitImg,
  },
  {
    id: 'urginea-maritima',
    hebrewName: 'חצב',
    englishName: 'Sea Squill',
    latinName: 'Urginea maritima',
    months: [8, 9, 10],
    protected: true,
    image: chatzavImg,
  },
  {
    id: 'paeonia-mascula',
    hebrewName: 'אדמונית החורש',
    englishName: 'Woodland Peony',
    latinName: 'Paeonia mascula',
    months: [3, 4],
    protected: true,
    image: admonitImg,
  },
  {
    id: 'colchicum-stevenii',
    hebrewName: 'סתוונית',
    englishName: 'Autumn Crocus',
    latinName: 'Colchicum stevenii',
    months: [10, 11, 12],
    protected: true,
    image: stavvanitImg,
  },
  {
    id: 'cyclamen-persicum',
    hebrewName: 'רקפת',
    englishName: 'Cyclamen',
    latinName: 'Cyclamen persicum',
    months: [12, 1, 2, 3],
    protected: true,
    image: rakefetImg,
  },
  {
    id: 'lilium-candidum',
    hebrewName: 'שושן צחור',
    englishName: 'White Lily',
    latinName: 'Lilium candidum',
    months: [5, 6],
    protected: true,
    image: shoshanImg,
  },
  {
    id: 'lupinus-pilosus',
    hebrewName: 'תורמוס',
    englishName: 'Blue Lupine',
    latinName: 'Lupinus pilosus',
    months: [2, 3],
    protected: true,
    image: turmusImg,
  },
  {
    id: 'helianthus-annuus',
    hebrewName: 'חמנייה',
    englishName: 'Sunflower',
    latinName: 'Helianthus annuus',
    months: [5, 6],
    protected: false,
    image: chamaniyaImg,
  },
];

const hebrewMonths = [
  '', 'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
];

const englishMonths = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const BloomingNow = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const actualMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState<number>(actualMonth);

  const bloomingSpecies = speciesData.filter((s) => s.months.includes(selectedMonth));
  const monthName = language === 'he' ? hebrewMonths[selectedMonth] : englishMonths[selectedMonth];
  const months = language === 'he' ? hebrewMonths : englishMonths;

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
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">
              {language === 'he' ? 'פורח עכשיו' : 'Blooming Now'}
            </h1>
          </div>
        </div>
      </header>

      {/* Month Banner */}
      <div className="px-4 pt-4 pb-2">
        <div className="bg-primary/10 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Flower className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              {language === 'he' ? 'בחר חודש' : 'Select month'}
            </p>
            <Select value={String(selectedMonth)} onValueChange={(v) => setSelectedMonth(Number(v))}>
              <SelectTrigger className="w-full h-8 border-0 bg-transparent p-0 text-xl font-bold text-foreground shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.slice(1).map((name, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {name} {i + 1 === actualMonth ? (language === 'he' ? '(עכשיו)' : '(now)') : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Badge variant="secondary" className="text-sm">
              {bloomingSpecies.length} {language === 'he' ? 'מינים' : 'species'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Map Button */}
      {bloomingSpecies.length > 0 && (
        <div className="px-4 pb-2">
          <Button
            variant="nature"
            size="lg"
            className="w-full gap-2"
            onClick={() => navigate(`/map?month=${selectedMonth}`)}
          >
            <MapPin className="w-5 h-5" />
            {language === 'he' ? 'הצג על המפה' : 'Show on Map'}
          </Button>
        </div>
      )}

      {/* Species Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {bloomingSpecies.map((species, index) => (
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
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {bloomingSpecies.length === 0 && (
          <div className="text-center py-12">
            <Flower className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              {language === 'he' ? 'אין פרחים פורחים החודש' : 'No flowers blooming this month'}
            </p>
          </div>
        )}
      </div>

      <AppFooter />
      <BottomNav />
    </div>
  );
};

export default BloomingNow;
