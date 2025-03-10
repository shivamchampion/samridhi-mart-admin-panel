// src/components/Logo.jsx
import { Box, Image, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Logo = ({ showText = true, size = 'md' }) => {
  // Define size variants
  const sizes = {
    sm: { logoHeight: '32px', fontSize: 'md', fontWeight: '600' },
    md: { logoHeight: '36px', fontSize: 'lg', fontWeight: '700' },
    lg: { logoHeight: '48px', fontSize: '2xl', fontWeight: '700' },
  };
  
  const { logoHeight, fontSize, fontWeight } = sizes[size];
  const bgLogo = '/logo-bg.png';  // Logo with background
  const transparentLogo = '/logo.png';  // Logo without background
  
  const logoSrc = useColorModeValue(bgLogo, transparentLogo);
  
  return (
    <Link to="/">
      <Flex align="center" h={logoHeight}>
        <Image 
          src={logoSrc} 
          alt="Samridhi Mart" 
          height={logoHeight}
          objectFit="contain"
        />
        {showText && (
          <Text
            ml={2}
            fontSize={fontSize}
            fontWeight={fontWeight}
            color="brand.500"
            letterSpacing="tight"
          >
            Samridhi Mart
          </Text>
        )}
      </Flex>
    </Link>
  );
};

export const LogoIconOnly = ({ size = 'md' }) => {
  const sizes = {
    sm: { logoHeight: '32px' },
    md: { logoHeight: '36px' },
    lg: { logoHeight: '48px' },
  };
  
  const { logoHeight } = sizes[size];
  return (
    <Link to="/">
      <Box height={logoHeight} width={logoHeight} position="relative" overflow="hidden">
        <Image 
          src="/logo-bg.png"
          alt="Samridhi Mart"
          height={logoHeight}
          width="auto"
          objectFit="contain"
        />
      </Box>
    </Link>
  );
};