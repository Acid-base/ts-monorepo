// my-medusa-store/frontend/src/api/products.ts
import { fetchData } from './utils';
import { Product } from '../types';

export const fetchProductById = async (productId: string): Promise<Product> => {
  const product = await fetchData<Product>(`/admin/products/${productId}`);
  return product;
};
