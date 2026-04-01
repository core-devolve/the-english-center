import HeroCarousel from "@/components/HeroCarousel";
import MarqueeBanner from "@/components/MarqueeBanner";
import TrustSection from "@/components/TrustSection";

import FeaturesSection from "@/components/FeaturesSection";


import StudentStories from "@/components/Studentstories";

export default function Home() {
  return (
    <main>
   
      <HeroCarousel />
      <MarqueeBanner />
      <TrustSection />
      <FeaturesSection />
      <StudentStories />
      
     
    </main>
  );
}
