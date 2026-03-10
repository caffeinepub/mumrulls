import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    imageUrl : Text;
    isBestSeller : Bool;
    isFeatured : Bool;
    inStock : Bool;
    rating : Nat;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  type Cart = {
    items : List.List<CartItem>;
  };

  let products = List.fromArray<Product>(
    [
      {
        id = 1;
        name = "4-in-1 Shaper";
        description = "Shapewear";
        price = 499;
        category = "Clothing";
        imageUrl = "";
        isBestSeller = false;
        isFeatured = true;
        inStock = true;
        rating = 5;
      },
      {
        id = 2;
        name = "Adjustable Waist Trimmer Belt";
        description = "Trimmer belt";
        price = 499;
        category = "Clothing";
        imageUrl = "";
        isBestSeller = false;
        isFeatured = true;
        inStock = true;
        rating = 4;
      },
      {
        id = 3;
        name = "Combo of Men's NS Lycra Track Pants";
        description = "Track pants";
        price = 699;
        category = "Clothing";
        imageUrl = "";
        isBestSeller = false;
        isFeatured = true;
        inStock = true;
        rating = 5;
      },
      {
        id = 4;
        name = "Cupid Pheromone Cologne for Men 50ML";
        description = "Cologne";
        price = 499;
        category = "Clothing";
        imageUrl = "";
        isBestSeller = false;
        isFeatured = true;
        inStock = true;
        rating = 3;
      },
      {
        id = 5;
        name = "Fabric Stain Remover";
        description = "Stain remover";
        price = 499;
        category = "Home and Kitchen";
        imageUrl = "";
        isBestSeller = false;
        isFeatured = true;
        inStock = true;
        rating = 5;
      },
      {
        id = 6;
        name = "Knee Patches Pack of 10";
        description = "Knee patches pack";
        price = 499;
        category = "Home and Kitchen";
        imageUrl = "";
        isBestSeller = false;
        isFeatured = true;
        inStock = true;
        rating = 4;
      },
      {
        id = 7;
        name = "Multifunctional Cleaner Pack of 4";
        description = "Cleaner pack";
        price = 599;
        category = "Home and Kitchen";
        imageUrl = "";
        isBestSeller = true;
        isFeatured = true;
        inStock = true;
        rating = 5;
      },
      {
        id = 8;
        name = "Multipurpose Wire Dishwashing Rags Pack of 10";
        description = "Dishwashing rags pack";
        price = 499;
        category = "Home and Kitchen";
        imageUrl = "";
        isBestSeller = false;
        isFeatured = true;
        inStock = true;
        rating = 4;
      },
      {
        id = 9;
        name = "Sopami Car Coating Spray 50ml Pack of 2";
        description = "Car coating spray pack";
        price = 499;
        category = "Best Sellers";
        imageUrl = "";
        isBestSeller = true;
        isFeatured = false;
        inStock = true;
        rating = 5;
      },
      {
        id = 10;
        name = "Portable Air Duster Wireless Vacuum Cleaner";
        description = "Vacuum cleaner";
        price = 599;
        category = "Best Sellers";
        imageUrl = "";
        isBestSeller = true;
        isFeatured = true;
        inStock = true;
        rating = 5;
      },
    ]
  );

  let carts = Map.empty<Principal, Cart>();

  public query ({ caller }) func getProducts() : async [Product] {
    products.toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.filter(
      func(product) {
        Text.equal(product.category, category);
      }
    ).toArray();
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.filter(
      func(product) {
        product.isFeatured;
      }
    ).toArray();
  };

  public query ({ caller }) func getBestSellers() : async [Product] {
    products.filter(
      func(product) {
        product.isBestSeller;
      }
    ).toArray();
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    let maybeProduct = products.find(
      func(product) {
        product.id == id;
      }
    );
    switch (maybeProduct) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func addToCart(productId : Nat, quantity : Nat) : async () {
    let items = List.empty<CartItem>();
    let cart = switch (carts.get(caller)) {
      case (null) { { items } };
      case (?existingCart) { existingCart };
    };

    let maybeItem = cart.items.find(
      func(item) {
        item.productId == productId;
      }
    );

    let newItems = switch (maybeItem) {
      case (null) {
        let currentArray = cart.items.toArray();
        let newItem = { productId; quantity };
        List.fromArray<CartItem>(([newItem]).concat(currentArray));
      };
      case (?item) {
        cart.items.map<CartItem, CartItem>(
          func(item) {
            if (item.productId == productId) {
              { productId; quantity };
            } else {
              item;
            };
          }
        );
      };
    };

    carts.add(caller, { items = newItems });
  };

  public shared ({ caller }) func removeFromCart(productId : Nat) : async () {
    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) {
        let newItems = cart.items.filter(
          func(item) {
            item.productId != productId;
          }
        );
        carts.add(caller, { items = newItems });
      };
    };
  };

  public shared ({ caller }) func updateCartQuantity(productId : Nat, quantity : Nat) : async () {
    if (quantity == 0) {
      await removeFromCart(productId);
      return;
    };

    switch (carts.get(caller)) {
      case (null) { Runtime.trap("Cart not found") };
      case (?cart) {
        let newItems = cart.items.map<CartItem, CartItem>(
          func(item) {
            if (item.productId == productId) {
              { productId; quantity };
            } else {
              item;
            };
          }
        );
        carts.add(caller, { items = newItems });
      };
    };
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.items.toArray() };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    carts.remove(caller);
  };

  public query ({ caller }) func getCollections() : async {
    clothing : [Product];
    homeAndKitchen : [Product];
    bestSellers : [Product];
  } {
    let clothing = products.filter(
      func(product) {
        Text.equal(product.category, "Clothing");
      }
    ).toArray();

    let homeAndKitchen = products.filter(
      func(product) {
        Text.equal(product.category, "Home and Kitchen");
      }
    ).toArray();

    let bestSellers = products.filter(
      func(product) {
        Text.equal(product.category, "Best Sellers");
      }
    ).toArray();

    {
      clothing;
      homeAndKitchen;
      bestSellers;
    };
  };
};
