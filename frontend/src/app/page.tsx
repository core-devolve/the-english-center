import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import MarqueeBanner from "@/components/MarqueeBanner";
import TrustSection from "@/components/TrustSection";
import WhyChooseEnglish from "@/components/WhyChooseEnglish";

import FeaturesSection from "@/components/FeaturesSection";

import Footer from "@/components/Footer";

import SuccessStories from "@/components/SuccessStories";
import StudentStories from "@/components/Studentstories";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroCarousel />
      <MarqueeBanner />
      <TrustSection />
      <WhyChooseEnglish />
      <SuccessStories /> 
      <StudentStories />
      <FeaturesSection />
      
      <Footer />
    </main>
  );
}
