import { useLanguage } from '@/contexts/LanguageContext';

interface AppFooterProps {
  height?: number;
}

const AppFooter = ({ height = 100 }: AppFooterProps) => {
  const { language } = useLanguage();

  return (
    <footer 
      className="text-center px-4 text-xs text-muted-foreground border-t border-border bg-card flex flex-col items-center justify-center mb-16"
      style={{ height: `${height}px` }}
    >
      <p>© 2026 {language === 'he' ? 'פרחי ישראל' : 'Israel Flowers'}. {language === 'he' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}</p>
      <p>{language === 'he' ? 'נבנה ועוצב על ידי נבות פורת' : 'Built and designed by Navot Porat'}</p>
    </footer>
  );
};

export default AppFooter;
