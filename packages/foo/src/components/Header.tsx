// my-medusa-store/frontend/src/components/Header.tsx
import {
  Box,
  Flex,
  Heading,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

const Header: React.FC = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <Box bg={bgColor} p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h1" size="lg" color={textColor}>
          <Link href="/" color={textColor}>
            Medusa Store
          </Link>
        </Heading>
        <Stack direction="row" spacing={4} align="center">
          <Link href="/cart" color={textColor}>
            Cart
          </Link>
          {/* Add other links as needed */}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Header;
