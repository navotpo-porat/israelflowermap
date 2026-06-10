import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, MapPin, Calendar, FileText, ChevronDown, Check, Upload } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import BottomNav from '@/components/BottomNav';
import AppFooter from '@/components/AppFooter';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const floweringStages = [
{ id: 'start', he: 'תחילת פריחה', en: 'Starting to bloom', icon: '🌱' },
{ id: 'peak', he: 'שיא פריחה', en: 'Peak bloom', icon: '🌸' },
{ id: 'end', he: 'סוף פריחה', en: 'End of bloom', icon: '🍂' }];


const AddSighting = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledSpecies = location.state?.species;

  const [image, setImage] = useState<string | null>(null);
  const [species, setSpecies] = useState(prefilledSpecies?.hebrewName || '');
  const [floweringStage, setFloweringStage] = useState('peak');
  const [notes, setNotes] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      toast.error(language === 'he' ? 'נא להעלות תמונה' : 'Please upload an image');
      return;
    }
    if (!species) {
      toast.error(language === 'he' ? 'נא לבחור מין' : 'Please select a species');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current location if enabled (high accuracy for better precision)
      let location = null;
      if (useCurrentLocation && navigator.geolocation) {
        try {
          const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 0,
            })
          );
          location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        } catch (e) {
          console.warn('Could not get location:', e);
        }
      }

      // Upload image to storage
      let imageUrl: string | null = null;
      if (image) {
        try {
          const response = await fetch(image);
          const blob = await response.blob();
          const fileName = `sighting-${Date.now()}.jpg`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('sighting-images')
            .upload(fileName, blob, { contentType: 'image/jpeg' });
          if (!uploadError && uploadData) {
            const { data: urlData } = supabase.storage
              .from('sighting-images')
              .getPublicUrl(uploadData.path);
            imageUrl = urlData.publicUrl;
          }
        } catch (e) {
          console.warn('Could not upload image:', e);
        }
      }

      const now = new Date();
      const dateStr = now.toLocaleDateString('he-IL') + ' ' + now.toLocaleTimeString('he-IL');

      // Send email notification
      const { error } = await supabase.functions.invoke('notify-sighting', {
        body: {
          species,
          floweringStage,
          location,
          notes,
          date: dateStr,
          imageUrl,
        },
      });

      if (error) {
        console.error('Email notification error:', error);
        throw error;
      }

      toast.success(language === 'he' ? 'התצפית נשמרה בהצלחה!' : 'Sighting saved successfully!');
      navigate('/map');
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(language === 'he' ? 'שגיאה בשמירה' : 'Error saving sighting');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-4 px-4 h-14">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/app">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-sans font-semibold">{t('addSighting')}</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}>
          
          <label className="block">
            <Card variant="nature" className="overflow-hidden cursor-pointer hover:shadow-medium transition-shadow">
              <CardContent className="p-0">
                {image ?
                <div className="aspect-video relative">
                    <img src={image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white font-medium">
                        {language === 'he' ? 'לחץ להחלפה' : 'Click to change'}
                      </p>
                    </div>
                  </div> :

                <div className="aspect-video flex flex-col items-center justify-center gap-3 bg-leaf-light/30">
                    <div className="w-16 h-16 rounded-full bg-leaf-light flex items-center justify-center">
                      <Camera className="w-8 h-8 text-leaf" />
                    </div>
                    <p className="font-medium text-foreground">
                      {language === 'he' ? 'העלאת תמונה' : 'Upload Photo'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {language === 'he' ? 'לחץ לצילום או העלאה' : 'Tap to capture or upload'}
                    </p>
                  </div>
                }
              </CardContent>
            </Card>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden" />
            
          </label>
        </motion.div>

        {/* Species */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}>
          
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">
              {language === 'he' ? 'מין הפרח' : 'Flower Species'}
            </span>
            <div className="relative">
              <Input
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                placeholder={language === 'he' ? 'הקלד או בחר מין...' : 'Type or select species...'}
                className="pr-10" />
              
              <Link
                to="/identify"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary hover:bg-primary/10 rounded">
                
                <Camera className="w-5 h-5" />
              </Link>
            </div>
          </label>
        </motion.div>

        {/* Flowering Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-2">
          
          <span className="text-sm font-medium text-foreground">{t('floweringStage')}</span>
          <div className="grid grid-cols-3 gap-2">
            {floweringStages.map((stage) =>
            <button
              key={stage.id}
              onClick={() => setFloweringStage(stage.id)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
              floweringStage === stage.id ?
              'border-primary bg-primary/5' :
              'border-border bg-card hover:border-primary/30'}`
              }>
              
                <span className="text-2xl block mb-1">{stage.icon}</span>
                <span className="text-xs font-medium text-foreground">
                  {language === 'he' ? stage.he : stage.en}
                </span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2">
          
          <span className="text-sm font-medium text-foreground">{t('location')}</span>
          <Card
            variant={useCurrentLocation ? 'feature' : 'flat'}
            className="cursor-pointer"
            onClick={() => setUseCurrentLocation(!useCurrentLocation)}>
            
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${useCurrentLocation ? 'bg-sky-light' : 'bg-muted'} flex items-center justify-center`}>
                <MapPin className={`w-5 h-5 ${useCurrentLocation ? 'text-sky' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {language === 'he' ? 'השתמש במיקום נוכחי' : 'Use current location'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {language === 'he' ? 'מיקום משוער לפרטיות' : 'Approximate location for privacy'}
                </p>
              </div>
              {useCurrentLocation &&
              <Check className="w-5 h-5 text-primary" />
              }
            </CardContent>
          </Card>
        </motion.div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-2">
          
          <label className="block space-y-2">
            <span className="text-sm font-medium text-foreground">{t('notes')}</span>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === 'he' ? 'הערות נוספות (אופציונלי)...' : 'Additional notes (optional)...'}
              rows={3} />
            
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          
          <Button
            variant="nature"
            size="xl"
            className="w-full"
            onClick={handleSubmit}
            disabled={isSubmitting}>
            
            {isSubmitting ?
            <>
                <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                
                  <Upload className="w-5 h-5" />
                </motion.div>
                {language === 'he' ? 'שומר...' : 'Saving...'}
              </> :

            <>
                <Check className="w-5 h-5" />
                {t('saveToMap')}
              </>
            }
          </Button>
        </motion.div>
      </div>

      <AppFooter />
      <BottomNav />
    </div>);

};

export default AddSighting;