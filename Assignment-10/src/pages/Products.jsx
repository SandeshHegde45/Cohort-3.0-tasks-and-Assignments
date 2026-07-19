import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import { getAllProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";

const categoryOptions = ["All Categories", "Electronics", "Clothing", "Furniture", "Home", "Sports", "Accessories"];
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");

  const selectedCategory = searchParams.get("category") || "All Categories";
  const selectedSort = searchParams.get("sort") || "featured";

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .finally(() => setIsLoading(false));
  }, []);

  function getFilteredProducts() {
    let filtered = products;

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchText.trim()) {
      const lowerSearchText = searchText.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(lowerSearchText)
      );
    }

    if (selectedSort === "price-asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }

  const filteredProducts = getFilteredProducts();

  function handleFilterChange(key, value) {
    const updatedParams = new URLSearchParams(searchParams);
    if (value && value !== "All Categories" && value !== "featured") {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }
    setSearchParams(updatedParams);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="font-display text-3xl font-bold">All Products</h1>
      <p className="mt-1 text-sm text-gray-500">
        {isLoading ? "Loading…" : `${filteredProducts.length} products found`}
      </p>

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-ink-900 p-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-ink-800 px-3">
          <Search size={16} className="text-gray-500" />
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(event) => handleFilterChange("category", event.target.value)}
          className="rounded-xl border border-white/10 bg-ink-800 px-3 py-2.5 text-sm text-white focus:outline-none"
        >
          {categoryOptions.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={selectedSort}
          onChange={(event) => handleFilterChange("sort", event.target.value)}
          className="rounded-xl border border-white/10 bg-ink-800 px-3 py-2.5 text-sm text-white focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className="aspect-[3/4] animate-pulse rounded-2xl bg-ink-800" />
            ))
          : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      {!isLoading && filteredProducts.length === 0 && (
        <p className="mt-16 text-center text-gray-500">
          No products match your search. Try a different keyword or category.
        </p>
      )}
    </div>
  );
}
