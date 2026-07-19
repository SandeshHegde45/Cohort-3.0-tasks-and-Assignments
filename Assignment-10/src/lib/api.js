import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
});

const excludedCategories = ["beauty"];

const categoryGroups = {
  Electronics: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  Clothing: [
    "mens-shirts",
    "mens-shoes",
    "tops",
    "womens-dresses",
    "womens-shoes",
  ],
  Furniture: ["furniture"],
  Home: [
    "home-decoration",
    "kitchen-accessories",
    "groceries",
    "skin-care",
    "fragrances",
  ],
  Sports: ["sports-accessories", "motorcycle", "vehicle"],
  Accessories: [
    "womens-bags",
    "womens-jewellery",
    "womens-watches",
    "mens-watches",
    "sunglasses",
  ],
};

export function getCategoryGroup(apiCategory) {
  const groupNames = Object.keys(categoryGroups);
  for (let i = 0; i < groupNames.length; i++) {
    const groupName = groupNames[i];
    if (categoryGroups[groupName].includes(apiCategory)) {
      return groupName;
    }
  }
  return "Accessories";
}

function getRealisticReviewCount(product) {
  const seed = Math.sin(product.id * 7919) * 10000;
  const pseudoRandomFraction = Math.abs(seed - Math.floor(seed));
  const baseCount = 20 + Math.round(pseudoRandomFraction * 970);
  const ratingBoost = Math.round(product.rating * 25);
  return baseCount + ratingBoost;
}

export function formatProduct(product) {
  return {
    id: product.id,
    title: product.title,
    brand: product.brand || product.category,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    reviewCount: getRealisticReviewCount(product),
    stock: product.stock,
    image: product.thumbnail,
    category: getCategoryGroup(product.category),
    isNew: product.id % 4 === 0,
  };
}

let cachedProductsPromise = null;

export async function getAllProducts() {
  if (!cachedProductsPromise) {
    cachedProductsPromise = apiClient
      .get("/products", { params: { limit: 0 } })
      .then((response) =>
        response.data.products
          .filter((product) => !excludedCategories.includes(product.category))
          .map(formatProduct),
      );
  }
  return cachedProductsPromise;
}

export async function getProductById(id) {
  const products = await getAllProducts();
  return products.find((product) => product.id === Number(id));
}

export default apiClient;
