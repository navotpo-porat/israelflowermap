import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Camera, Map, Flower2, Users, Globe, ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-flowers.jpg';
import flowersBanner from '@/assets/flowers-banner.png';
import logoSvg from '@/assets/logo.svg';
import SEO from '@/components/SEO';

const Landing = () => {
  const { t, language, setLanguage } = useLanguage();

  const features = [
  {
    icon: Camera,
    title: t('aiIdentification'),
    description: t('aiDesc'),
    color: 'bg-leaf-light text-leaf'
  },
  {
    icon: Map,
    title: t('interactiveMap'),
    description: t('mapDesc'),
    color: 'bg-leaf-light text-leaf'
  },
  {
    icon: Users,
    title: t('communityDriven'),
    description: t('communityDesc'),
    color: 'bg-leaf-light text-leaf'
  },
  {
    icon: Flower2,
    title: t('speciesCatalog'),
    description: t('catalogDesc'),
    color: 'bg-leaf-light text-leaf'
  }];


  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="מפת פריחות ישראל | Bloom Finder Israel"
        description="גלה את אתרי הפריחה הטובים ביותר בישראל – כלניות, פרגים ועוד. מפה עם מיקומים מדויקים ועדכונים בזמן אמת."
        path="/"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Bloom Finder Israel – מפת פריחות ישראל",
        "url": "https://israelflowermap.lovable.app",
        "description": "גלה את אתרי הפריחה הטובים ביותר בישראל – כלניות, פרגים ועוד. מפה עם מיקומים מדויקים ועדכונים בזמן אמת.",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Web",
        "inLanguage": ["he", "en"],
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "ILS" },
        "author": { "@type": "Person", "name": "Navot Porat" }
      }) }} />
      {/* Rainbow gradient top bar */}
      <div className="h-1.5 bg-gradient-rainbow w-full fixed top-0 z-[60]" />

      {/* Header */}
      <header className="fixed top-1.5 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <img src={logoSvg} alt="Logo" className="w-6 h-6" />
            </div>
            <span className="font-sans text-xl text-foreground font-normal">
              {t('appName')}
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              
              <Globe className="w-4 h-4" />
              {language === 'he' ? 'EN' : 'עב'}
            </button>
            <Button variant="nature" asChild>
              <Link to="/app">{t('getStarted')}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-[4.5rem] min-h-screen flex items-start">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Israeli wildflowers"
            className="w-full h-full object-cover opacity-15" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
        </div>
        
        <div className="container relative z-10 my-0 py-[20px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center my-0 py-[20px]">
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 border-0 border-[#333333]/0 text-primary-foreground bg-[#2e2e2e]/0">
              
              
              {language === 'he' ? 'מפת פריחה ומיקום מדויק' : 'Accurate bloom map & locations'}
            </motion.div>
            
            <motion.img
              src={flowersBanner}
              alt="Israeli wildflowers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mx-auto mb-6 max-w-4xl w-full" />
            
            
            <h1 className="md:text-7xl text-foreground mb-6 leading-tight font-bold text-4xl">
              {language === 'he' ? 'מתי כל פרח פורח בישראל ואיפה?' : 'When & where does every flower bloom in Israel?'}
            </h1>
            
            <p className="mb-10 max-w-2xl mx-auto text-base font-normal text-primary-foreground">
              {language === 'he' ?
              'גלו איזה פרח פורח עכשיו בארץ לפי עונה ולפי מיקום' :
              'Discover which flowers are blooming now by season and location'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/app">
                  <Flower2 className="w-5 h-5" />
                  {t('getStarted')}
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/map">
                  <Map className="w-5 h-5" />
                  {language === 'he' ? 'מפת פריחה' : 'Bloom Map'}
                </Link>
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8 flex justify-center">
              
              <ChevronDown className="w-8 h-8 text-muted-foreground animate-bounce" />
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-secondary/50 py-[20px]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t('features')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base px-[24px]">
              {language === 'he' ?
              'כל הכלים שאתם צריכים כדי לגלות ולתעד את הפריחה הישראלית' :
              'All the tools you need to discover and document Israeli blooms'}
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) =>
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}>
              
                <Card variant="feature" className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#242424] py-0">
        <div className="container relative z-10 py-[30px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center">
            
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              {language === 'he' ? 'מוכנים לגלות?' : 'Ready to Explore?'}
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto text-base px-0">
              {language === 'he' ?
              'הצטרפו לקהילה של אוהבי טבע ותגלו את הפריחה הישראלית' :
              'Join a community of nature lovers and discover Israeli blooms'}
            </p>
            <Button
              variant="heroOutline"
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0"
              asChild>
              
              <Link to="/app">{t('getStarted')}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <img src={logoSvg} alt="Logo" className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">{t('appName')}</span>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-end">
              <p>© 2026 {language === 'he' ? 'פרחי ישראל' : t('appName')}. {language === 'he' ? 'כל הזכויות שמורות.' : 'All rights reserved.'}</p>
              <p>{language === 'he' ? 'נבנה ועוצב על ידי נבות פורת' : 'Built & designed by Navot Porat'}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default Landing;