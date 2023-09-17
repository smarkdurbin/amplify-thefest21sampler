"use client";

import { Box, BoxProps, Container, Heading } from "@chakra-ui/react";
import React, { RefObject } from "react";

interface HeaderProps extends BoxProps {}

const Header = ({ ...rest }: HeaderProps) => {
  return (
    <Box
      as="header"
      backgroundColor="gray.800"
      color="whiteAlpha.900"
      className="Header"
      paddingY={6}
      {...rest}
    >
      <Container>
        <Heading
          as="h1"
          fontFamily="Oswald"
          fontSize="xl"
          fontWeight="normal"
          lineHeight={1}
          textAlign="center"
          textTransform="uppercase"
        >
          The Fest 21 (Unofficial) Sampler
        </Heading>
      </Container>
    </Box>
  );
};

export default Header;
