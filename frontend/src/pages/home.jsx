import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans">
      <Navbar />
      <Hero />
      <Categories />
      <Features />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}
