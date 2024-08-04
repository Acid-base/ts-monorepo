// types.ts
export interface Product {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  description: string;
  // Add other product properties as needed
  // Example:
  //  variants: Variant[];
  //  category: string;
  //  createdAt: Date;
  //  updatedAt: Date;
}

// Example for a variant interface
// export interface Variant {
//   id: string;
//   sku: string;
//   price: number;
//   inventory_quantity: number;
//   // ... other variant properties
// }

export interface CartItem {
  id: string; // Unique identifier for the cart item
  product: Product; // The product associated with the cart item
  quantity: number; // The quantity of the product in the cart
  // ... other cart item properties (e.g., price, options)
}
