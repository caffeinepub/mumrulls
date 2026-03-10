# Mumrulls

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full e-commerce landing page inspired by mumrulls.myshopify.com
- Maroon (#800020) and beige (#F5F0E8) color theme throughout
- Top announcement bar: "Cash On Delivery + Free Shipping all over India"
- Sticky navigation: Logo (Mumrulls), Home, Catalog, Contact, Cart icon, Login
- Hero banner section with headline and shop CTA
- Collections grid: Clothing, Home and Kitchen, Best Sellers
- Featured Products section (8 products with name, price in INR, add to cart button)
- Top Seller spotlight section (Portable Air Duster Wireless Vacuum Cleaner - Rs. 599)
- Best Sellers horizontal scroll/grid section
- "Why Choose Us?" section: Cash on Delivery, Free Shipping, Easy Return icons
- About Us section with brand story
- Email subscribe footer section
- Full footer with payment methods, policies links, copyright
- Cart drawer/sidebar with item count badge
- Product modal/detail overlay when clicking a product card
- Backend: product catalog, cart management, collections

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Generate Motoko backend with product catalog (id, name, price, category, imageUrl, isBestSeller, isFeatured, inStock), cart operations (add, remove, update quantity, get cart), collections list
2. Build React frontend:
   - Announcement bar (maroon bg, beige text)
   - Sticky nav with cart badge
   - Hero section with bold headline and CTA
   - Collections 3-col grid with hover effects
   - Featured products 4-col responsive grid with product cards
   - Top Seller spotlight with large product image
   - Best Sellers section
   - Why Choose Us 3-col icon+text section
   - About Us section
   - Email subscribe + footer
   - Cart drawer sliding from right
   - Product detail modal
3. Seed backend with all 8+ products from the Shopify store
4. Wire frontend to backend via actor calls
