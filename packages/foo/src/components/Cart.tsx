// my-medusa-store/frontend/src/components/Cart.tsx
import React from 'react';
import { CartItem } from '../types';
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Text,
  Button,
  Flex,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CartProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<CartProps> = ({ cartItems, setCartItems }) => {
  const queryClient = useQueryClient();
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const removeFromCartMutation = useMutation(
    (itemId: string) => {
      // Replace this with your actual remove-from-cart logic
      // Send the itemId to your backend API
      return fetch(`/cart/${itemId}`, {
        method: 'DELETE',
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        // After successful remove-from-cart, update the cart in the query client
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      },
    }
  );

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCartMutation.mutate(itemId);
    // Update the cartItems state in App.tsx
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <Box p={4} bg={bgColor}>
      <Heading as="h2" size="lg">
        Shopping Cart
      </Heading>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <UnorderedList>
          {cartItems.map((item) => (
            <ListItem key={item.id} py={2} borderBottom="1px solid gray.200">
              <Flex alignItems="center">
                <Text fontSize="lg" fontWeight="medium">
                  {item.product.title}
                </Text>
                <Spacer />
                <Text fontSize="lg">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Text>
                <Spacer />
                <Text>Quantity: {item.quantity}</Text>
                <Spacer />
                <Button
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </Button>
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      )}
      <Flex justifyContent="flex-end" mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          Total: ${calculateTotal().toFixed(2)}
        </Text>
      </Flex>
      <Button
        variant="solid"
        colorScheme="green"
        mt={4}
        w="full"
        isLoading={removeFromCartMutation.isLoading}
        onClick={() => {
          // Handle checkout logic here
          // Example: navigate to checkout page
          // window.location.href = '/checkout';
        }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};

export default Cart;

