// my-medusa-store/frontend/src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Footer from './components/Footer';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartItem } from './types';

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  // State to manage cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route
              path="/cart"
              element={
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
              }
            />
            <Route
              path="/checkout"
              element={<Checkout cartItems={cartItems} />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;

