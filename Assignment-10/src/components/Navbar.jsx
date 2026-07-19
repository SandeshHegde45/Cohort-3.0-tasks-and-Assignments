import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Zap, ShoppingCart, LogOut, Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-500 text-ink-950">
            <Zap size={18} fill="currentColor" />
          </span>
          <span className="font-display text-lg font-bold">
            Sky<span className="text-lime-500">Mart</span>
          </span>
        </NavLink>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-lime-500" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser ? (
            <>
              <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-ink-800 py-1 pl-1 pr-3 text-sm sm:flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-500 text-xs font-bold text-ink-950">
                  {currentUser.avatar}
                </span>
                {currentUser.name}
              </span>
              <button
                onClick={toggleCart}
                className="relative rounded-lg border border-white/10 bg-ink-800 p-2 text-gray-300 hover:text-white"
                aria-label="Open cart"
              >
                <ShoppingCart size={18} />
                {totalItemCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-lime-500 text-[10px] font-bold text-ink-950">
                    {totalItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="hidden rounded-lg border border-white/10 bg-ink-800 p-2 text-gray-300 hover:text-white sm:block"
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="rounded-lg bg-lime-500 px-4 py-2 text-sm font-semibold text-ink-950 hover:bg-lime-400"
            >
              Sign in
            </NavLink>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg border border-white/10 bg-ink-800 p-2 text-gray-300 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/5 bg-ink-950 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-lime-500" : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {currentUser && (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 text-left text-sm font-medium text-gray-400 hover:text-white"
              >
                <LogOut size={16} /> Log out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
