// my-medusa-store/frontend/src/components/Footer.tsx
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

const Footer: React.FC = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bgColor} p={4} mt={8}>
      <Flex justifyContent="center">
        <Text fontSize="sm" color="gray.600">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
