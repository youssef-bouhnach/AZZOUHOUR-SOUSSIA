import { useState, useEffect, useRef } from "react";
import { ShoppingBag, Leaf, Menu, X, User, LogOut, Settings, Heart, Search, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/story", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const readFavs = () => {
      try {
        const stored = localStorage.getItem("favorites");
        setFavCount(stored ? JSON.parse(stored).length : 0);
      } catch {
        setFavCount(0);
      }
    };
    readFavs();
    window.addEventListener("storage", readFavs);
    const interval = setInterval(readFavs, 1000);
    return () => {
      window.removeEventListener("storage", readFavs);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-focus input when search opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLinkClick = () => setMobileOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "backdrop-blur-lg bg-background/92 border-b border-border/80 shadow-card"
            : "backdrop-blur-md bg-background/75 border-b border-border/60"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-primary shrink-0">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-leaf text-primary-foreground shadow-soft">
              <Leaf className="h-4 w-4" />
            </span>
            AZZOUHOUR-SOUSSIA
          </Link>

          {/* Desktop nav — hidden when search is open */}
          <nav
            className={cn(
              "hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground transition-all duration-300",
              searchOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="relative py-1 hover:text-primary transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {l.label}
              </Link>
            ))}

            {/* Search trigger — inline with nav links */}
            <button
              onClick={() => setSearchOpen(true)}
              className="relative py-1 flex items-center gap-1.5 hover:text-primary transition-colors group"
              aria-label="Search"
            >
              <span className="flex items-center justify-center h-7 w-7 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                <Search className="h-3.5 w-3.5" />
              </span>
              <span>Search</span>
            </button>
          </nav>

          {/* Search bar — expands over the nav when open */}
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 hidden md:flex items-center transition-all duration-300",
              searchOpen
                ? "w-[480px] opacity-100 pointer-events-auto"
                : "w-0 opacity-0 pointer-events-none"
            )}
          >
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex items-center gap-2 bg-background border-2 border-primary/30 rounded-full px-4 py-1.5 shadow-lg focus-within:border-primary transition-colors">
                <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close search"
                >
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted hover:bg-muted/80">
                    Esc
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Mobile search button */}
            <button
              className="md:hidden grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 rounded-full">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="gap-2 rounded-full"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}

            {/* Favorites button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/favorites")}
              className="gap-2 rounded-full relative"
              aria-label={`Favorites, ${favCount} items`}
            >
              <Heart className={cn("h-4 w-4", favCount > 0 && "fill-red-500 text-red-500")} />
              {favCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-xs bg-red-500 text-white">
                  {favCount}
                </span>
              )}
            </Button>

            {/* Cart button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/cart")}
              className="gap-2 rounded-full"
              aria-label={`View cart, ${count} items`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span
                className={cn(
                  "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-xs text-primary-foreground transition-all",
                  count > 0 ? "bg-accent scale-100" : "bg-primary scale-100"
                )}
              >
                {count}
              </span>
            </Button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            searchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <form onSubmit={handleSearch} className="px-4 pb-3">
            <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2 border border-border focus-within:border-primary transition-colors">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery("")}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </form>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <div
        className={cn(
          "fixed inset-0 z-30 md:hidden transition-all duration-300",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <nav
          className={cn(
            "absolute top-16 left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border shadow-soft transition-all duration-300 ease-out",
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <ul className="container py-4 flex flex-col gap-1">
            {links.map((l, i) => (
              <li key={l.href} style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms" }}>
                <Link
                  to={l.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};
