import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'he' | 'en';

interface Translations {
  [key: string]: {
    he: string;
    en: string;
  };
}

const translations: Translations = {
  appName: { he: 'פרחי ישראל', en: 'Israel Flowers' },
  tagline: { he: 'גלו את הפריחה הישראלית', en: 'Discover Israeli Blooms' },
  identify: { he: 'זיהוי פרח', en: 'Identify Flower' },
  exploreMap: { he: 'מפת פריחה', en: 'Explore Map' },
  browseFlowers: { he: 'קטלוג פרחים', en: 'Browse Flowers' },
  addSighting: { he: 'דווח על פריחה', en: 'Add Sighting' },
  search: { he: 'חיפוש...', en: 'Search...' },
  home: { he: 'בית', en: 'Home' },
  map: { he: 'מפה', en: 'Map' },
  species: { he: 'מינים', en: 'Species' },
  profile: { he: 'פרופיל', en: 'Profile' },
  camera: { he: 'מצלמה', en: 'Camera' },
  upload: { he: 'העלאה', en: 'Upload' },
  takePhoto: { he: 'צלם תמונה', en: 'Take Photo' },
  uploadPhoto: { he: 'העלה תמונה', en: 'Upload Photo' },
  identifyFlower: { he: 'זהה את הפרח', en: 'Identify Flower' },
  results: { he: 'תוצאות', en: 'Results' },
  confidence: { he: 'רמת ביטחון', en: 'Confidence' },
  saveToMap: { he: 'שמור למפה', en: 'Save to Map' },
  floweringStage: { he: 'שלב פריחה', en: 'Flowering Stage' },
  start: { he: 'תחילת פריחה', en: 'Start' },
  peak: { he: 'שיא פריחה', en: 'Peak' },
  end: { he: 'סוף פריחה', en: 'End' },
  notes: { he: 'הערות', en: 'Notes' },
  location: { he: 'מיקום', en: 'Location' },
  date: { he: 'תאריך', en: 'Date' },
  getStarted: { he: 'התחילו עכשיו', en: 'Get Started' },
  learnMore: { he: 'למידע נוסף', en: 'Learn More' },
  features: { he: 'תכונות', en: 'Features' },
  aiIdentification: { he: 'זיהוי בינה מלאכותית', en: 'AI Identification' },
  aiDesc: { he: 'צלמו פרח וקבלו זיהוי מיידי', en: 'Snap a flower and get instant identification' },
  interactiveMap: { he: 'מפה אינטראקטיבית', en: 'Interactive Map' },
  mapDesc: { he: 'גלו פריחות בזמן אמת ברחבי הארץ', en: 'Discover real-time blooms across Israel' },
  communityDriven: { he: 'קהילת פרחים', en: 'Community Driven' },
  communityDesc: { he: 'שתפו תצפיות והצטרפו לקהילה', en: 'Share sightings and join the community' },
  speciesCatalog: { he: 'קטלוג מינים', en: 'Species Catalog' },
  catalogDesc: { he: 'מאגר מקיף של פרחי ישראל', en: 'Comprehensive database of Israeli flowers' },
  hebrewName: { he: 'שם עברי', en: 'Hebrew Name' },
  englishName: { he: 'שם אנגלי', en: 'English Name' },
  latinName: { he: 'שם לטיני', en: 'Latin Name' },
  floweringSeason: { he: 'עונת פריחה', en: 'Flowering Season' },
  habitat: { he: 'בית גידול', en: 'Habitat' },
  color: { he: 'צבע', en: 'Color' },
  protectionStatus: { he: 'סטטוס הגנה', en: 'Protection Status' },
  protected: { he: 'מוגן', en: 'Protected' },
  notProtected: { he: 'לא מוגן', en: 'Not Protected' },
  allRegions: { he: 'כל האזורים', en: 'All Regions' },
  allColors: { he: 'כל הצבעים', en: 'All Colors' },
  allMonths: { he: 'כל החודשים', en: 'All Months' },
  sightings: { he: 'תצפיות', en: 'Sightings' },
  recentSightings: { he: 'תצפיות אחרונות', en: 'Recent Sightings' },
  nearYou: { he: 'קרוב אליך', en: 'Near You' },
  trending: { he: 'פופולרי', en: 'Trending' },
  seasonalBlooms: { he: 'פריחות עונתיות', en: 'Seasonal Blooms' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('he');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === 'he' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={language === 'he' ? 'font-sans' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
