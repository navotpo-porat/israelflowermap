import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, ArrowLeft, Loader2, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import BottomNav from '@/components/BottomNav';
import AppFooter from '@/components/AppFooter';

// Species images for results display
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

const speciesImageMap: Record<string, string> = {
  'anemone-coronaria': kalanitImg,
  'iris-mariae': irisImg,
  'tulipa-agenensis': tzivoniImg,
  'narcissus-tazetta': narkisImg,
  'papaver-umbonatum': paregImg,
  'crocus-hyemalis': karkomImg,
  'sternbergia-clusiana': chalmonitImg,
  'urginea-maritima': chatzavImg,
  'paeonia-mascula': admonitImg,
  'colchicum-stevenii': stavvanitImg,
  'cyclamen-persicum': rakefetImg,
  'lilium-candidum': shoshanImg,
  'lupinus-pilosus': turmusImg
};

interface IdentificationResult {
  id: string;
  englishName: string;
  hebrewName: string;
  latinName: string;
  confidence: number;
}

const Identify = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [results, setResults] = useState<IdentificationResult[] | null>(null);
  const [noMatch, setNoMatch] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setSelectedImage(base64);
        identifyFlower(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const identifyFlower = async (imageBase64: string) => {
    setIsIdentifying(true);
    setResults(null);
    setNoMatch(null);

    try {
      const { data, error } = await supabase.functions.invoke('identify-flower', {
        body: { imageBase64 }
      });

      if (error) {
        throw new Error(error.message || 'Failed to identify');
      }

      if (data.error) {
        if (data.error === 'rate_limit') {
          toast({
            title: language === 'he' ? 'יותר מדי בקשות' : 'Too many requests',
            description: data.message,
            variant: 'destructive'
          });
          return;
        }
        throw new Error(data.message || 'Identification failed');
      }

      if (data.noMatch) {
        setNoMatch(data.noMatchReason || (language === 'he' ? 'לא זוהה פרח מוכר' : 'No known species matched'));
        setResults([]);
      } else {
        setResults(data.matches || []);
      }
    } catch (err) {
      console.error('Identification error:', err);
      toast({
        title: language === 'he' ? 'שגיאה' : 'Error',
        description: language === 'he' ? 'לא הצלחנו לזהות את הפרח. נסו שוב.' : 'Could not identify the flower. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsIdentifying(false);
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  const handleSelectResult = (result: IdentificationResult) => {
    navigate('/add-sighting', { state: { species: result } });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-4 px-4 h-14">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/app">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold font-sans">{t('identifyFlower')}</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <AnimatePresence mode="wait">
          {!selectedImage ?
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4">
            
              <Card variant="nature" className="overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center justify-center aspect-square">
                  <div className="w-24 h-24 rounded-full bg-leaf-light flex items-center justify-center mb-6">
                    <Camera className="w-12 h-12 text-leaf" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2 text-center font-sans">
                    {language === 'he' ? 'צלמו או העלו תמונה' : 'Take or Upload a Photo'}
                  </h2>
                  <p className="text-muted-foreground text-center text-sm mb-6">
                    {language === 'he' ?
                  'צלמו את הפרח מקרוב לתוצאות מדויקות יותר' :
                  'Get a close-up of the flower for better results'}
                  </p>

                  <div className="flex gap-4">
                    <Button variant="nature" size="lg" onClick={handleCameraClick}>
                      <Camera className="w-5 h-5" />
                      {t('camera')}
                    </Button>
                    <Button variant="outline" size="lg" onClick={handleGalleryClick}>
                      <Upload className="w-5 h-5" />
                      {t('upload')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden" />

              <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden" />
            

              <Card variant="glass">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">
                    {language === 'he' ? '💡 טיפים לצילום' : '💡 Photo Tips'}
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>{language === 'he' ? '• צלמו בתאורה טובה' : '• Use good lighting'}</li>
                    <li>{language === 'he' ? '• התמקדו בפרח עצמו' : '• Focus on the flower itself'}</li>
                    <li>{language === 'he' ? '• הראו את העלים אם אפשר' : '• Include leaves if possible'}</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div> :

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4">
            
              <Card variant="nature" className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                  src={selectedImage}
                  alt="Selected flower"
                  className="w-full h-full object-cover" />
                
                  {isIdentifying &&
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                        <p className="font-medium text-foreground">
                          {language === 'he' ? 'מזהה באמצעות AI...' : 'AI Identifying...'}
                        </p>
                      </div>
                    </div>
                }
                </div>
              </Card>

              {/* No match message */}
              {noMatch &&
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}>
              
                  <Card variant="glass">
                    <CardContent className="p-4 text-center">
                      <p className="text-lg font-semibold text-foreground mb-2">
                        {language === 'he' ? '🤔 לא זיהינו פרח מוכר' : '🤔 No known species matched'}
                      </p>
                      <p className="text-sm text-muted-foreground">{noMatch}</p>
                    </CardContent>
                  </Card>
                </motion.div>
            }

              {/* Results */}
              {results && results.length > 0 &&
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3">
              
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {t('results')}
                  </h3>

                  {results.map((result, index) =>
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}>
                
                      <Card
                  variant="action"
                  className="overflow-hidden cursor-pointer"
                  onClick={() => handleSelectResult(result)}>
                  
                        <CardContent className="p-3 flex items-center gap-3">
                          <img
                      src={speciesImageMap[result.id] || ''}
                      alt={result.englishName}
                      className="w-16 h-16 rounded-lg object-contain bg-leaf-light/30 p-1" />
                    
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground">
                              {language === 'he' ? result.hebrewName : result.englishName}
                            </p>
                            <p className="text-sm text-muted-foreground italic">
                              {result.latinName}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${result.confidence}%` }} />
                          
                              </div>
                              <span className="text-xs font-medium text-primary">
                                {result.confidence}%
                              </span>
                            </div>
                          </div>
                          <Check className="w-5 h-5 text-muted-foreground" />
                        </CardContent>
                      </Card>
                    </motion.div>
              )}
                </motion.div>
            }

              {/* Try again */}
              {!isIdentifying &&
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedImage(null);
                setResults(null);
                setNoMatch(null);
              }}>
              
                  {language === 'he' ? 'נסה שוב' : 'Try Again'}
                </Button>
            }
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <AppFooter />
      <BottomNav />
    </div>);

};

export default Identify;