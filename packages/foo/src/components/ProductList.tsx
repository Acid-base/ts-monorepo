// my-medusa-store/frontend/src/components/ProductList.tsx
import React from 'react';
import { fetchData } from '../api/utils';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Heading,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

interface ProductListProps {
  // ... any props specific to this component
}

const ProductList: React.FC<ProductListProps> = () => {
  const { isLoading, error, data: products } = useQuery({
    queryKey: ['products'], // The query key
    queryFn: () => fetchData<Product[]>('/admin/products'), // The query function
  });

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  if (isLoading) {
    return (
      <Box p={4} bg={bgColor}>
        <Heading as="h2" size="lg">
          Loading products...
        </Heading>
        <Spinner size="xl" mt={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} bg={bgColor}>
        <Alert status="error" mt={4}>
          <AlertIcon />
          <Text>Error loading products: {error.message}</Text>
        </Alert>
      </Box>
    );
  }

  if (!products) {
    return (
      <Box p={4} bg={bgColor}>
        <Heading as="h2" size="lg">
          No products found.
        </Heading>
      </Box>
    );
  }

  return (
    <Box p={4} bg={bgColor}>
      <Heading as="h2" size="lg">
        Our Products
      </Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={4}>
        {products.map((product: Product) => ( // Now you are safe to map
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
