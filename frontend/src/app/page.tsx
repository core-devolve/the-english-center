import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import MarqueeBanner from "@/components/MarqueeBanner";
import TrustSection from "@/components/TrustSection";
import CoursesSection from "@/components/CoursesSection";
import FeaturesSection from "@/components/FeaturesSection";
import TeachersSection from "@/components/TeachersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AppDownloadSection from "@/components/AppDownloadSection";
import Footer from "@/components/Footer";
import FloatingCallBtn from "@/components/FloatingCallBtn";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroCarousel />
      <MarqueeBanner />
      <TrustSection />
      <CoursesSection />
      <FeaturesSection />
      <TeachersSection />
      <TestimonialsSection />
      <AppDownloadSection />
      <Footer />
      <FloatingCallBtn />
    </main>
  );
}
