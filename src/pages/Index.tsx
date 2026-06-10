import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Map, Flower2, Plus, ScanSearch, ExternalLink } from 'lucide-react';
import admonitImg from '@/assets/sightings/admonit.jpg';
import kalaniotImg from '@/assets/sightings/kalaniot.jpg';
import turmusimImg from '@/assets/sightings/turmusim.jpg';
import logoSvg from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import BottomNav from '@/components/BottomNav';
import SEO from '@/components/SEO';
import AppFooter from '@/components/AppFooter';

const Index = () => {
  const { t, language } = useLanguage();

  const actions = [
  {
    icon: Map,
    title: t('exploreMap'),
    description: language === 'he' ? 'גלה פריחות סביבך' : 'Discover blooms nearby',
    href: '/map',
    color: 'bg-leaf-light',
    iconColor: 'text-leaf'
  },
  {
    icon: Flower2,
    title: t('browseFlowers'),
    description: language === 'he' ? 'חפש במאגר המינים' : 'Search the species catalog',
    href: '/species',
    color: 'bg-leaf-light',
    iconColor: 'text-leaf'
  },
  {
    icon: Plus,
    title: language === 'he' ? 'דיווח תצפית' : 'Add Sighting',
    description: language === 'he' ? 'דווחו על פריחה חדשה' : 'Report a new bloom',
    href: '/add-sighting',
    color: 'bg-leaf-light',
    iconColor: 'text-leaf'
  },
  {
    icon: ScanSearch,
    title: language === 'he' ? 'זיהוי פרח' : 'Identify Flower',
    description: language === 'he' ? 'צלמו וזהו פרחים עם AI' : 'Snap and identify with AI',
    href: '/identify',
    color: 'bg-leaf-light',
    iconColor: 'text-leaf'
  }];


  const recentSightings = [
  {
    id: 1,
    name: language === 'he' ? 'אדמונית החורש' : 'Peony',
    location: language === 'he' ? 'הר מירון' : 'Mount Meron',
    image: admonitImg,
    daysAgo: 2
  },
  {
    id: 2,
    name: language === 'he' ? 'כלניות' : 'Anemones',
    location: language === 'he' ? 'מול חוות רונית' : 'Near Ronit Farm',
    image: kalaniotImg,
    daysAgo: 3
  },
  {
    id: 3,
    name: language === 'he' ? 'תורמוסים' : 'Lupines',
    location: language === 'he' ? 'פינת הנצחה נילי קאפמן' : 'Nili Kaufman Memorial',
    image: turmusimImg,
    daysAgo: 5
  }];


  const externalLinks = [
  {
    label: language === 'he' ? 'שמירת הנקודות דרך גוגל מפס' : 'Open points on Google Maps',
    href: 'https://www.google.com/maps/d/u/1/edit?mid=1z2p-jfiNqhyCKfFQjxDO_iI9HUDDXsQ&usp=sharing'
  },
  {
    label: language === 'he' ? 'הצטרפות לקהילה שלנו' : 'Join our community',
    href: 'https://www.facebook.com/share/g/1EaX4PAx2T/'
  }];


  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="זיהוי פריחה | Bloom Finder Israel"
        description="זהה פרחים, צפה בתצפיות ומצא אתרי פריחה קרובים אליך."
        path="/app"
      />
      {/* Rainbow gradient top bar */}
      <div className="h-1.5 bg-gradient-rainbow w-full fixed top-0 z-[60]" />

      {/* Header */}
      <header className="pt-8 pb-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between">
          
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {language === 'he' ? 'שלום! 👋' : 'Hello! 👋'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'he' ? 'מה תרצו לעשות היום?' : 'What would you like to do today?'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#248a05]">
            <img src={logoSvg} alt="Logo" className="w-6 h-6" />
          </div>
        </motion.div>
      </header>

      {/* Main Actions */}
      <section className="px-4 mb-8">
        <div className="grid gap-4">
          {actions.map((action, index) =>
          <motion.div
            key={action.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}>
            
              <Link to={action.href}>
                <Card variant="action" className="overflow-hidden">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center flex-shrink-0`}>
                      <action.icon className={`w-7 h-7 ${action.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground text-lg">
                        {action.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Recent Sightings */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">
            {t('recentSightings')}
          </h2>
          <Link to="/map" className="text-sm text-primary font-medium">
            {language === 'he' ? 'הצג הכל' : 'View All'}
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
          {recentSightings.map((sighting, index) =>
          <motion.div
            key={sighting.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex-shrink-0 w-48 snap-start">
            
              <Card variant="nature" className="overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <img
                  src={sighting.image}
                  alt={sighting.name}
                  className="w-full h-full object-cover" />
                
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-foreground text-sm font-medium truncate">
                      {sighting.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {sighting.location}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* External Links */}
      <section className="px-4 mb-8">
        <div className="grid gap-3">
          {externalLinks.map((link, index) =>
          <motion.div
            key={link.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}>
            
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <Card variant="flat" className="overflow-hidden hover:border-primary/30 transition-colors">
                  <CardContent className="p-4 flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium text-sm">{link.label}</span>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          )}
        </div>
      </section>

      <AppFooter height={100} />

      {/* FAB for adding sighting */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="fixed bottom-24 right-4 z-40">
        
        <Button variant="fab" size="iconLg" asChild>
          <Link to="/add-sighting">
            <Plus className="w-6 h-6" />
          </Link>
        </Button>
      </motion.div>

      <BottomNav />
    </div>);

};

export default Index;