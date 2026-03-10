import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AboutUs from "./components/AboutUs";
import AnnouncementBar from "./components/AnnouncementBar";
import BestSellers from "./components/BestSellers";
import CartDrawer from "./components/CartDrawer";
import CollectionsGrid from "./components/CollectionsGrid";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductModal from "./components/ProductModal";
import TopSellerSpotlight from "./components/TopSellerSpotlight";
import WhyChooseUs from "./components/WhyChooseUs";

export type CartDrawerState = {
  isOpen: boolean;
};

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<bigint | null>(
    null,
  );
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      <AnnouncementBar />
      <Navbar scrolled={scrolled} onCartClick={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <CollectionsGrid />
        <FeaturedProducts onProductClick={setSelectedProductId} />
        <TopSellerSpotlight onProductClick={setSelectedProductId} />
        <BestSellers onProductClick={setSelectedProductId} />
        <WhyChooseUs />
        <AboutUs />
      </main>
      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onProductClick={setSelectedProductId}
      />

      <ProductModal
        productId={selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />

      <Toaster position="top-right" />
    </div>
  );
}
