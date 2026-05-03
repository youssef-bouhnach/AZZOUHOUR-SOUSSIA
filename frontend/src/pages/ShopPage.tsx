import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/site/Navbar";
import { Shop } from "@/components/site/Shop";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";

const ShopPage = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <Shop />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default ShopPage;
