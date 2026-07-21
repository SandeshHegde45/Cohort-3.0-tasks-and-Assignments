import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Zap, ShoppingCart, LogOut, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Shop" },
  { path: "/about", label: "About" },
];

export default function Navbar() {
  const { totalItemCount, toggleCart } = useCart();
  const { currentUser, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLogout() {
    logoutUser();
    toast.success("Logged out. See you soon! 👋");
    navigate("/login");
  }

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled ? "bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/8" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-volt rounded-xl flex items-center justify-center">
            <Zap size={15} className="text-ink fill-ink" />
          </div>
          <span className="font-heading font-bold text-lg">
            Sky<span className="text-volt">Mart</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          {currentUser && (
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
              <div className="w-6 h-6 bg-volt rounded-lg flex items-center justify-center text-ink text-xs font-bold">
                {currentUser.avatar}
              </div>
              <span className="text-sm text-white/70 font-body max-w-[100px] truncate">
                {currentUser.name}
              </span>
            </div>
          )}

          <button
            onClick={toggleCart}
            className="relative p-2.5 bg-white/8 hover:bg-white/12 border border-white/10 rounded-xl transition-all"
          >
            <ShoppingCart size={18} />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-volt text-ink text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItemCount > 9 ? "9+" : totalItemCount}
              </span>
            )}
          </button>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2.5 bg-white/8 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 rounded-xl transition-all text-white/60 hover:text-red-400"
          >
            <LogOut size={16} />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 bg-white/8 border border-white/10 rounded-xl"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-white/8 bg-[#111] px-4 py-4 flex flex-col gap-3 animate-fade-in">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `nav-link text-base py-2 ${isActive ? "active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 text-sm mt-2">
            <LogOut size={14} /> Logout
          </button>
        </div>
      )}
    </header>
  );
}
