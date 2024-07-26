// my-medusa-store/frontend/src/components/ProductDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { Product } from '../types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

// Install react-router-dom: npm install react-router-dom

const fetchProduct = async (productId: string | undefined): Promise<Product | null> => {
  if (!productId) return null;
  try {
    const data = await fetchProductById(productId);
    return data;
  } catch (error) {
    console.error("Error fetching product:", error); // Or display a user-friendly error
    return null;
  }
};

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  const { isLoading, error, data: product } = useQuery({
    queryKey: ['product', productId], // The query key
    queryFn: () => fetchProduct(productId), // The query function
  });

  const addToCartMutation = useMutation(
    (product: Product) => {
      // Replace this with your actual add-to-cart logic
      // Send the product data to your backend API
      return fetch('/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        // After successful add-to-cart, update the cart in the query client
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      },
    }
  );

  if (isLoading) {
    return (
      <Box p={4} bg={bgColor}>
        <Heading as="h2" size="lg">
          Loading product...
        </Heading>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} bg={bgColor}>
        <Heading as="h2" size="lg">
          Error loading product: {error.message}
        </Heading>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box p={4} bg={bgColor}>
        <Heading as="h2" size="lg">
          Product not found
        </Heading>
      </Box>
    );
  }

  return (
    <Box p={4} bg={bgColor}>
      <Heading as="h1" size="xl" mb={4}>
        {product.title}
      </Heading>
      <Image
        src={product.thumbnail}
        alt={product.title}
        borderRadius="md"
        mb={4}
      />
      <Text fontSize="lg" mb={4}>
        {product.description}
      </Text>
      {/* ... other product details */}
      <Button
        variant="solid"
        colorScheme="green"
        onClick={() => addToCartMutation.mutate(product)} // Pass the product
        isLoading={addToCartMutation.isLoading} // Correctly accessing isLoading
      >
        {addToCartMutation.isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </Box>
  );
};

export default ProductDetail;
