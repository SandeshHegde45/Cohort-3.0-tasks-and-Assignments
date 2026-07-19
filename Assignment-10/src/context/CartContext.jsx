import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "sm_cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      return JSON.parse(storedCart);
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  }

  function removeFromCart(productId) {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  }

  function clearCart() {
    setCartItems([]);
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function toggleCart() {
    setIsCartOpen(!isCartOpen);
  }

  function placeOrder() {
    clearCart();
    closeCart();
    setIsOrderPlaced(true);
  }

  function dismissOrderPlaced() {
    setIsOrderPlaced(false);
  }

  let totalItemCount = 0;
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalItemCount += item.quantity;
    totalPrice += item.quantity * item.price;
  });

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItemCount,
    totalPrice,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
    isOrderPlaced,
    placeOrder,
    dismissOrderPlaced,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
