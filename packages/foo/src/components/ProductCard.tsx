// my-medusa-store/frontend/src/components/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      p={4}
      bg={bgColor}
    >
      <Link to={`/products/${product.id}`}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          borderRadius="md"
          mb={4}
        />
      </Link>
      <Heading as="h3" size="md" mb={2}>
        {product.title}
      </Heading>
      <Text fontSize="sm" mb={4}>
        {product.description}
      </Text>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        ${product.price.toFixed(2)}
      </Text>
      <Button variant="solid" colorScheme="green" size="sm">
        Add to Cart
      </Button>
    </Box>
  );
};

export default ProductCard;
