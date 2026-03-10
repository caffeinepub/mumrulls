import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    isFeatured: boolean;
    category: string;
    rating: bigint;
    price: bigint;
    isBestSeller: boolean;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface backendInterface {
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    clearCart(): Promise<void>;
    getBestSellers(): Promise<Array<Product>>;
    getCart(): Promise<Array<CartItem>>;
    getCollections(): Promise<{
        clothing: Array<Product>;
        homeAndKitchen: Array<Product>;
        bestSellers: Array<Product>;
    }>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProduct(id: bigint): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    removeFromCart(productId: bigint): Promise<void>;
    updateCartQuantity(productId: bigint, quantity: bigint): Promise<void>;
}
