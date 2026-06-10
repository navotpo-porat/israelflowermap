import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Shield, Share2, Heart, Camera } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

const speciesDetails: Record<string, {
  hebrewName: string;
  englishName: string;
  latinName: string;
  family: {he: string;en: string;};
  description: {he: string;en: string;};
  habitat: {he: string;en: string;};
  floweringSeason: {he: string;en: string;};
  colors: string[];
  protected: boolean;
  image: string;
  regions: {he: string;en: string;};
}> = {
  'anemone-coronaria': {
    hebrewName: 'כלנית מצויה',
    englishName: 'Crown Anemone',
    latinName: 'Anemone coronaria',
    family: { he: 'נוריתיים', en: 'Ranunculaceae' },
    description: {
      he: 'הכלנית היא אחד מפרחי הבר האהובים בישראל. היא פורחת בחורף ובאביב ומכסה שטחים נרחבים בצבעים אדומים, סגולים ולבנים. הפרח נפתח ביום ונסגר בלילה.',
      en: 'The Crown Anemone is one of Israel\'s most beloved wildflowers. It blooms in winter and spring, covering vast areas in red, purple, and white colors.'
    },
    habitat: { he: 'שדות, יערות, חורש ים-תיכוני', en: 'Fields, forests, Mediterranean scrubland' },
    floweringSeason: { he: 'ינואר - מרץ', en: 'January - March' },
    colors: ['red', 'purple', 'white', 'pink'],
    protected: true,
    image: kalanitImg,
    regions: { he: 'צפון, מרכז, דרום', en: 'North, Center, South' }
  },
  'iris-mariae': {
    hebrewName: 'אירוס',
    englishName: 'Iris',
    latinName: 'Iris mariae',
    family: { he: 'אירוסיים', en: 'Iridaceae' },
    description: {
      he: 'האירוס הוא פרח בר מרהיב הפורח בנגב. הוא מוכר בזכות עלי הכותרת הסגולים הגדולים שלו ונחשב לאחד הפרחים המיוחדים בישראל.',
      en: 'The Iris is a stunning wildflower blooming in the Negev desert. Known for its large purple petals, it is one of Israel\'s most unique flowers.'
    },
    habitat: { he: 'נגב, ערבות', en: 'Negev, steppes' },
    floweringSeason: { he: 'מרץ – מאי', en: 'March - May' },
    colors: ['purple'],
    protected: true,
    image: irisImg,
    regions: { he: 'מרכז - דרום', en: 'Center - South' }
  },
  'tulipa-agenensis': {
    hebrewName: 'צבעוני',
    englishName: 'Mountain Tulip',
    latinName: 'Tulipa agenensis',
    family: { he: 'שושניים', en: 'Liliaceae' },
    description: {
      he: 'הצבעוני הוא פרח בר אדום מרשים הפורח באביב. ניתן למצוא אותו בעיקר באזור הכרמל ובשרון.',
      en: 'The Mountain Tulip is an impressive red wildflower blooming in spring. Found mainly in the Carmel and Sharon regions.'
    },
    habitat: { he: 'שדות, גבעות', en: 'Fields, hills' },
    floweringSeason: { he: 'מרץ – מאי', en: 'March - May' },
    colors: ['red'],
    protected: true,
    image: tzivoniImg,
    regions: { he: 'צפון, מרכז', en: 'North, Center' }
  },
  'narcissus-tazetta': {
    hebrewName: 'נרקיס',
    englishName: 'Narcissus',
    latinName: 'Narcissus tazetta',
    family: { he: 'נרקיסיים', en: 'Amaryllidaceae' },
    description: {
      he: 'הנרקיס הוא פרח לבן עם כותרת צהובה הפורח בחורף. ריחו הנעים מפיץ ניחוח מתוק בשדות.',
      en: 'The Narcissus is a white flower with a yellow crown that blooms in winter. Its pleasant fragrance fills the fields with a sweet scent.'
    },
    habitat: { he: 'שדות, גבעות, חורש', en: 'Fields, hills, scrubland' },
    floweringSeason: { he: 'דצמבר – מרץ', en: 'December - March' },
    colors: ['white'],
    protected: true,
    image: narkisImg,
    regions: { he: 'צפון, מרכז', en: 'North, Center' }
  },
  'papaver-umbonatum': {
    hebrewName: 'פרג',
    englishName: 'Poppy',
    latinName: 'Papaver umbonatum',
    family: { he: 'פרגיים', en: 'Papaveraceae' },
    description: {
      he: 'הפרג הוא פרח אדום בוהק הפורח באביב ומכסה שטחים נרחבים. עלי הכותרת העדינים שלו רוקדים ברוח.',
      en: 'The Poppy is a bright red flower blooming in spring, covering vast areas. Its delicate petals dance in the wind.'
    },
    habitat: { he: 'שדות, שוליי דרכים', en: 'Fields, roadsides' },
    floweringSeason: { he: 'מרץ – מאי', en: 'March - May' },
    colors: ['red'],
    protected: false,
    image: paregImg,
    regions: { he: 'צפון, מרכז, דרום', en: 'North, Center, South' }
  },
  'crocus-hyemalis': {
    hebrewName: 'כרכום חורפי',
    englishName: 'Winter Crocus',
    latinName: 'Crocus hyemalis',
    family: { he: 'אירוסיים', en: 'Iridaceae' },
    description: {
      he: 'הכרכום החורפי הוא פרח לבן-סגלגל קטן הפורח בחורף. הוא מבשר את בוא הגשמים ומופיע מיד אחרי הגשם הראשון.',
      en: 'The Winter Crocus is a small white-purple flower blooming in winter. It heralds the coming of rain and appears right after the first rainfall.'
    },
    habitat: { he: 'חורש, סלעים', en: 'Scrubland, rocks' },
    floweringSeason: { he: 'ספטמבר - נובמבר', en: 'September - November' },
    colors: ['white', 'purple'],
    protected: true,
    image: karkomImg,
    regions: { he: 'צפון, מרכז', en: 'North, Center' }
  },
  'sternbergia-clusiana': {
    hebrewName: 'חלמונית',
    englishName: 'Sternbergia',
    latinName: 'Sternbergia clusiana',
    family: { he: 'נרקיסיים', en: 'Amaryllidaceae' },
    description: {
      he: 'החלמונית היא פרח צהוב גדול הפורח בסתיו. היא נדירה יחסית ומוגנת על פי חוק.',
      en: 'The Sternbergia is a large yellow flower blooming in autumn. It is relatively rare and legally protected.'
    },
    habitat: { he: 'מדבר, ערבות', en: 'Desert, steppes' },
    floweringSeason: { he: 'נובמבר - דצמבר', en: 'November - December' },
    colors: ['yellow'],
    protected: true,
    image: chalmonitImg,
    regions: { he: 'דרום, צפון', en: 'South, North' }
  },
  'urginea-maritima': {
    hebrewName: 'חצב',
    englishName: 'Sea Squill',
    latinName: 'Urginea maritima',
    family: { he: 'שושניים', en: 'Liliaceae' },
    description: {
      he: 'החצב הוא צמח גבוה עם תפרחת לבנה הפורח בסוף הקיץ. הוא מבשר את בוא הסתיו ונחשב לסמל של תחילת השנה.',
      en: 'The Sea Squill is a tall plant with white inflorescence blooming in late summer. It heralds autumn and symbolizes the beginning of the year.'
    },
    habitat: { he: 'גבעות, שדות', en: 'Hills, fields' },
    floweringSeason: { he: 'אוגוסט - אוקטובר', en: 'August - October' },
    colors: ['white'],
    protected: true,
    image: chatzavImg,
    regions: { he: 'צפון, מרכז, דרום', en: 'North, Center, South' }
  },
  'paeonia-mascula': {
    hebrewName: 'אדמונית החורש',
    englishName: 'Woodland Peony',
    latinName: 'Paeonia mascula',
    family: { he: 'אדמוניתיים', en: 'Paeoniaceae' },
    description: {
      he: 'אדמונית החורש היא פרח גדול ומרשים בצבע אדום עמוק. היא פורחת בחורש הים-תיכוני ונחשבת לאחד הפרחים היפים בישראל.',
      en: 'The Woodland Peony is a large, impressive deep-red flower. It blooms in Mediterranean scrubland and is considered one of Israel\'s most beautiful flowers.'
    },
    habitat: { he: 'חורש ים-תיכוני', en: 'Mediterranean scrubland' },
    floweringSeason: { he: 'מרץ - אפריל', en: 'March - April' },
    colors: ['red'],
    protected: true,
    image: admonitImg,
    regions: { he: 'צפון', en: 'North' }
  },
  'colchicum-stevenii': {
    hebrewName: 'סתוונית',
    englishName: 'Autumn Crocus',
    latinName: 'Colchicum stevenii',
    family: { he: 'סתווניתיים', en: 'Colchicaceae' },
    description: {
      he: 'הסתוונית היא פרח ורוד-סגלגל הפורח בסתיו. היא מופיעה לפני העלים ויוצרת מראה ייחודי בנוף.',
      en: 'The Autumn Crocus is a pink-purple flower blooming in autumn. It appears before the leaves, creating a unique landscape sight.'
    },
    habitat: { he: 'גבעות, שדות', en: 'Hills, fields' },
    floweringSeason: { he: 'אוקטובר - דצמבר', en: 'October - December' },
    colors: ['pink'],
    protected: true,
    image: stavvanitImg,
    regions: { he: 'צפון, מרכז', en: 'North, Center' }
  },
  'cyclamen-persicum': {
    hebrewName: 'רקפת',
    englishName: 'Cyclamen',
    latinName: 'Cyclamen persicum',
    family: { he: 'רקפתיים', en: 'Primulaceae' },
    description: {
      he: 'הרקפת היא פרח ורוד-לבן עדין הפורח בחורף. עלי הכותרת המתהפכים שלה יוצרים צורה ייחודית ומוכרת.',
      en: 'The Cyclamen is a delicate pink-white flower blooming in winter. Its reflexed petals create a unique and recognizable shape.'
    },
    habitat: { he: 'חורש, יערות, סלעים', en: 'Scrubland, forests, rocks' },
    floweringSeason: { he: 'דצמבר – מרץ', en: 'December - March' },
    colors: ['pink', 'white'],
    protected: true,
    image: rakefetImg,
    regions: { he: 'צפון, מרכז', en: 'North, Center' }
  },
  'lilium-candidum': {
    hebrewName: 'שושן צחור',
    englishName: 'White Lily',
    latinName: 'Lilium candidum',
    family: { he: 'שושניים', en: 'Liliaceae' },
    description: {
      he: 'השושן הצחור הוא פרח לבן גדול ומרהיב עם ריח עז. הוא נדיר מאוד בטבע ומוגן על פי חוק.',
      en: 'The White Lily is a large, stunning white flower with a strong fragrance. It is very rare in nature and legally protected.'
    },
    habitat: { he: 'חורש, מצוקים', en: 'Scrubland, cliffs' },
    floweringSeason: { he: 'מאי - יוני', en: 'May - June' },
    colors: ['white'],
    protected: true,
    image: shoshanImg,
    regions: { he: 'צפון', en: 'North' }
  },
  'lupinus-pilosus': {
    hebrewName: 'תורמוס',
    englishName: 'Blue Lupine',
    latinName: 'Lupinus pilosus',
    family: { he: 'קטניות', en: 'Fabaceae' },
    description: {
      he: 'התורמוס הוא צמח גבוה עם תפרחת כחולה מרשימה הפורח באביב. שדות התורמוסים יוצרים מראה עוצר נשימה.',
      en: 'The Blue Lupine is a tall plant with impressive blue inflorescence blooming in spring. Lupine fields create a breathtaking sight.'
    },
    habitat: { he: 'שדות, גבעות', en: 'Fields, hills' },
    floweringSeason: { he: 'פברואר – מרץ', en: 'February - March' },
    colors: ['blue'],
    protected: true,
    image: turmusImg,
    regions: { he: 'צפון, מרכז', en: 'North, Center' }
  },
  'helianthus-annuus': {
    hebrewName: 'חמנייה',
    englishName: 'Sunflower',
    latinName: 'Helianthus annuus',
    family: { he: 'מורכבים', en: 'Asteraceae' },
    description: {
      he: 'החמנייה היא פרח צהוב גדול ומרהיב הפורח בסוף האביב ובתחילת הקיץ. ראש הפרח עוקב אחר השמש לאורך היום, ומכאן שמה. שדות חמניות יוצרים מראה עוצר נשימה של ים צהוב.',
      en: 'The Sunflower is a large, stunning yellow flower blooming in late spring and early summer. The flower head follows the sun throughout the day, hence its name. Sunflower fields create a breathtaking sea of yellow.'
    },
    habitat: { he: 'שדות חקלאיים, שוליי דרכים', en: 'Agricultural fields, roadsides' },
    floweringSeason: { he: 'מאי - יוני', en: 'May - June' },
    colors: ['yellow'],
    protected: false,
    image: chamaniyaImg,
    regions: { he: 'צפון, מרכז', en: 'North, Center' }
  }
};

const SpeciesDetail = () => {
  const { id } = useParams<{id: string;}>();
  const { language, t } = useLanguage();

  const species = speciesDetails[id as string] || speciesDetails['anemone-coronaria'];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Image */}
      <div className="relative h-72 flex items-center justify-center bg-card">
        <img
          src={species.image}
          alt={language === 'he' ? species.hebrewName : species.englishName}
          className="max-w-[85%] max-h-[85%] object-contain" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-safe">
          <Button variant="glass" size="icon" className="rounded-full" asChild>
            <Link to="/species">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="glass" size="icon" className="rounded-full">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="icon" className="rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Protection Badge */}
        {species.protected &&
        <div className="absolute bottom-4 right-4">
            <Badge className="bg-leaf text-primary-foreground gap-1 text-sm py-1 px-3">
              <Shield className="w-4 h-4" />
              {t('protected')}
            </Badge>
          </div>
        }
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 -mt-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}>
          
          {/* Title */}
          <Card variant="glass" className="overflow-hidden">
            <CardContent className="p-4">
              <h1 className="text-3xl text-foreground mb-1 font-sans font-semibold">
                {language === 'he' ? species.hebrewName : species.englishName}
              </h1>
              <p className="text-lg text-muted-foreground italic">
                {species.latinName}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'he' ? species.family.he : species.family.en}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3">
          
          <Card variant="feature">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-petal-light flex items-center justify-center">
                <Calendar className="w-5 h-5 text-petal" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('floweringSeason')}</p>
                <p className="font-medium text-foreground text-sm">
                  {language === 'he' ? species.floweringSeason.he : species.floweringSeason.en}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="feature">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-light flex items-center justify-center">
                <MapPin className="w-5 h-5 text-sky" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('habitat')}</p>
                <p className="font-medium text-foreground text-sm">
                  {language === 'he' ? species.regions.he : species.regions.en}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}>
          
          <h3 className="font-semibold text-foreground mb-2">{t('color')}</h3>
          <div className="flex gap-2">
            {species.colors.map((color) =>
            <div
              key={color}
              className={`w-8 h-8 rounded-full border-2 border-card shadow-soft ${
              color === 'red' ? 'bg-red-500' :
              color === 'purple' ? 'bg-purple-500' :
              color === 'white' ? 'bg-white border-border' :
              color === 'pink' ? 'bg-pink-400' :
              color === 'blue' ? 'bg-blue-500' :
              color === 'yellow' ? 'bg-yellow-400' :
              'bg-muted'}`
              } />

            )}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          
          <Card variant="default">
            <CardContent className="p-4">
              <p className="text-foreground leading-relaxed">
                {language === 'he' ? species.description.he : species.description.en}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex gap-3">
          
          <Button variant="nature" className="flex-1" asChild>
            <Link to={`/map?species=${id}`}>
              <MapPin className="w-4 h-4" />
              {language === 'he' ? 'הצג במפה' : 'View on Map'}
            </Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link to="/add-sighting">
              <Camera className="w-4 h-4" />
              {language === 'he' ? 'דווח על תצפית' : 'Report Sighting'}
            </Link>
          </Button>
        </motion.div>
      </div>

      <AppFooter />
      <BottomNav />
    </div>);

};

export default SpeciesDetail;