import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Flower2, Flower } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const { t, language } = useLanguage();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: t('home'), href: '/app' },
    { icon: Map, label: t('map'), href: '/map' },
    { icon: Flower2, label: t('species'), href: '/species' },
    { icon: Flower, label: language === 'he' ? 'פורח עכשיו' : 'Blooming', href: '/blooming' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
