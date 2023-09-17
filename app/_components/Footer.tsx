"use client";

import { Box, BoxProps, Container } from "@chakra-ui/react";
import React, { RefObject } from "react";
import Navigation from "./Navigation";

interface FooterProps extends BoxProps {}

const Footer = ({ ...rest }: FooterProps) => {
  return (
    <Box
      as="footer"
      backgroundColor="gray.800"
      color="whiteAlpha.900"
      className="Footer"
    >
      <Container>
        <Navigation />
      </Container>
    </Box>
  );
};

export default Footer;
