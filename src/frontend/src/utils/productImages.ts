// Maps product names and categories to Unsplash image URLs

const PRODUCT_IMAGES: Record<string, string> = {
  // Clothing
  "4-in-1 shaper":
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
  "shape wear":
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
  "tummy tucker":
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
  "waist trimmer":
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
  "track pants":
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
  "lycra track":
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
  cologne:
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
  pheromone:
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
  perfume:
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop",
  // Home & Kitchen
  "fabric stain":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  "stain remover":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  dishwashing:
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
  dishwash:
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
  "cleaning rags":
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
  "multifunctional cleaner":
    "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop",
  "cleaner pack":
    "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop",
  "car coating":
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=400&fit=crop",
  sopami:
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=400&fit=crop",
  // Health
  "knee patches":
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
  "knee patch":
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
  // Electronics
  "portable air duster":
    "/assets/generated/product-vacuum-cleaner.dim_600x600.jpg",
  "vacuum cleaner": "/assets/generated/product-vacuum-cleaner.dim_600x600.jpg",
  "air duster": "/assets/generated/product-vacuum-cleaner.dim_600x600.jpg",
  "wireless vacuum": "/assets/generated/product-vacuum-cleaner.dim_600x600.jpg",
};

const CATEGORY_IMAGES: Record<string, string> = {
  clothing:
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
  "home and kitchen":
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
  kitchen:
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
  home: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
  health:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
  fitness:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
  electronics:
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
  beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
  automobile:
    "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=400&h=400&fit=crop",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop";

export function getProductImage(
  name: string,
  category: string,
  imageUrl?: string,
): string {
  if (imageUrl && imageUrl.trim().length > 0) return imageUrl;

  const nameLower = name.toLowerCase();
  for (const [key, url] of Object.entries(PRODUCT_IMAGES)) {
    if (nameLower.includes(key)) return url;
  }

  const categoryLower = category.toLowerCase();
  for (const [key, url] of Object.entries(CATEGORY_IMAGES)) {
    if (categoryLower.includes(key)) return url;
  }

  return FALLBACK_IMAGE;
}

export function formatPrice(price: bigint): string {
  return `Rs. ${Number(price).toLocaleString("en-IN")}`;
}
