// my-medusa-store/frontend/src/components/Checkout.tsx
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
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CheckoutProps {
  cartItems: CartItem[];
  // ... other props for checkout details
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems }) => {
  const queryClient = useQueryClient();
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const placeOrderMutation = useMutation(
    (checkoutData: {
      cartItems: CartItem[];
      shippingName: string;
      // ... other fields
    }) => {
      // Replace this with your actual checkout logic
      // Send the checkoutData to your backend API
      return fetch('/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        // After successful checkout, clear the cart
        queryClient.setQueryData(['cart'], []);
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const shippingName = formData.get('shipping-name')?.toString() || ''; // Get shipping name
    const checkoutData = {
      cartItems,
      shippingName,
      // ... other fields from formData
    };
    placeOrderMutation.mutate(checkoutData);
  };

  return (
    <Box p={4} bg={bgColor}>
      <Heading as="h2" size="lg">
        Checkout
      </Heading>
      {/* Display cart items and total */}
      <Box mb={4}>
        <Heading as="h3" size="md">
          Cart Items
        </Heading>
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
              </Flex>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box mb={4}>
        <Flex justifyContent="flex-end">
          <Text fontSize="lg" fontWeight="bold">
            Total: ${calculateTotal().toFixed(2)}
          </Text>
        </Flex>
      </Box>
      {/* Form for shipping address, billing info */}
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel htmlFor="shipping-name">Shipping Name:</FormLabel>
          <Input
            id="shipping-name"
            type="text"
            required
            placeholder="Enter your name"
          />
        </FormControl>
        {/* Add other input fields for address, billing */}
        <Button
          type="submit"
          variant="solid"
          colorScheme="green"
          isLoading={placeOrderMutation.isLoading}
          disabled={placeOrderMutation.isLoading}
        >
          {placeOrderMutation.isLoading ? 'Placing Order...' : 'Place Order'}
        </Button>
      </form>
    </Box>
  );
};

export default Checkout;
