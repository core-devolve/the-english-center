import HeroCarousel from "@/components/HeroCarousel";
import MarqueeBanner from "@/components/MarqueeBanner";
import TrustSection from "@/components/TrustSection";
import WhyChooseEnglish from "@/components/WhyChooseEnglish";

import FeaturesSection from "@/components/FeaturesSection";


import SuccessStories from "@/components/SuccessStories";
import StudentStories from "@/components/Studentstories";

export default function Home() {
  return (
    <main>
   
      <HeroCarousel />
      <MarqueeBanner />
      <TrustSection />
      <FeaturesSection />
      <WhyChooseEnglish />
      <SuccessStories /> 
      <StudentStories />
      
     
    </main>
  );
}
