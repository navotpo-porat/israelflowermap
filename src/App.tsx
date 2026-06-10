import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import Identify from "./pages/Identify";
import MapExplore from "./pages/MapExplore";
import Species from "./pages/Species";
import SpeciesDetail from "./pages/SpeciesDetail";
import AddSighting from "./pages/AddSighting";

import BloomingNow from "./pages/BloomingNow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Index />} />
            <Route path="/identify" element={<Identify />} />
            <Route path="/map" element={<MapExplore />} />
            <Route path="/species" element={<Species />} />
            <Route path="/species/:id" element={<SpeciesDetail />} />
            <Route path="/add-sighting" element={<AddSighting />} />
            
            <Route path="/blooming" element={<BloomingNow />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
