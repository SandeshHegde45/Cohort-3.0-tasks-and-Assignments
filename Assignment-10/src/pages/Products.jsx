import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, X, ChevronDown, PackageSearch } from "lucide-react";
import { getAllProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

const categoryOptions = ["Electronics", "Clothing", "Furniture", "Home", "Sports", "Accessories"];

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "rating-asc", label: "Lowest Rated" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [sort, setSort] = useState(searchParams.get("sort") === "rating" ? "rating-desc" : "default");

  useEffect(() => {
    getAllProducts()
      .then((data) => setProducts(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== "all") {
      list = list.filter((product) => product.category === category);
    }

    if (search.trim()) {
      const query = search.trim().toLowerCase();
      list = list.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === "rating-desc") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === "rating-asc") {
      list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }

    return list;
  }, [products, category, search, sort]);

  const hasFilters = search || category !== "all" || sort !== "default";

  function clearAll() {
    setSearch("");
    setCategory("all");
    setSort("default");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl sm:text-4xl mb-2">All Products</h1>
        <p className="text-white/40 font-body text-sm">
          {isLoading ? "Loading..." : `${filtered.length} products found`}
          {category !== "all" && (
            <span className="text-volt">
              {" "}
              in <span className="capitalize">{category}</span>
            </span>
          )}
        </p>
      </div>

      <div className="bg-[#111] border border-white/8 rounded-2xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="field pl-10 pr-8 h-10 w-full"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="field h-10 pr-8 appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="all">All Categories</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="field h-10 pr-8 appearance-none cursor-pointer min-w-[180px]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
          </div>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/15
                         border border-red-500/20 px-4 h-10 rounded-2xl text-sm font-body transition-all shrink-0"
            >
              <X size={13} /> Clear
            </button>
          )}
        </div>

        {hasFilters && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/6">
            {category !== "all" && (
              <span className="badge bg-volt/15 text-volt border border-volt/20 text-xs gap-1">
                {category}
                <button onClick={() => setCategory("all")}>
                  <X size={10} />
                </button>
              </span>
            )}
            {search && (
              <span className="badge bg-volt/10 text-volt border border-volt/20 text-xs gap-1">
                "{search}"
                <button onClick={() => setSearch("")}>
                  <X size={10} />
                </button>
              </span>
            )}
            {sort !== "default" && (
              <span className="badge bg-volt/10 text-volt border border-volt/20 text-xs gap-1">
                {sortOptions.find((option) => option.value === sort)?.label}
                <button onClick={() => setSort("default")}>
                  <X size={10} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {isError && (
        <div className="flex flex-col items-center py-24 gap-4 text-center">
          <p className="font-heading font-bold text-xl text-white/60">Failed to load products</p>
          <button onClick={() => window.location.reload()} className="btn-volt">
            Retry
          </button>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {!isLoading && !isError && filtered.length === 0 && (
        <div className="flex flex-col items-center py-24 gap-4 text-center">
          <PackageSearch size={56} className="text-white/15" />
          <div>
            <p className="font-heading font-bold text-xl text-white/50">No products found</p>
            <p className="text-white/25 text-sm mt-1">
              {search ? `No results for "${search}"` : "Try changing the filters"}
            </p>
          </div>
          <button onClick={clearAll} className="btn-ghost mt-2">
            Clear Filters
          </button>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              style={{ animationDelay: `${Math.min(index * 40, 500)}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
