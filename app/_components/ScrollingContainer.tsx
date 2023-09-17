"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  BoxProps,
  Button,
  Container,
  VisuallyHidden,
  useColorMode,
} from "@chakra-ui/react";
import { IoMdArrowUp } from "react-icons/io";

interface scrollingContainerProps extends BoxProps {}

const ScrollingContainer = ({ children, ...rest }: scrollingContainerProps) => {
  // Ref
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerElementRef = useRef<HTMLDivElement>(null);

  // State
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  const [scrollButtonPosition, setScrollButtonPosition] = useState<{
    top: string;
    left: number;
  }>({ top: "-999px", left: -999 });

  useEffect(() => {
    const containerElement = containerElementRef.current;

    const handleScroll = () => {
      if (containerElement) {
        setShowScrollToTopButton(containerElement.scrollTop > 0);
      }
    };

    containerElement?.addEventListener("scroll", handleScroll);

    return () => {
      containerElement?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const buttonElement = buttonRef.current;
    const containerElement = containerElementRef.current;

    if (showScrollToTopButton && buttonElement && containerElement) {
      setScrollButtonPosition({
        top: `calc(${containerElement.getBoundingClientRect().y}px + ${
          containerElement.getBoundingClientRect().height
        }px - ${buttonElement?.getBoundingClientRect().height}px )`,
        left: 0,
      });
    }
  }, [showScrollToTopButton]);

  const scrollToTop = () => {
    if (containerElementRef.current) {
      containerElementRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      height="100%"
      overflowY="scroll"
      paddingBottom={20}
      ref={containerElementRef}
      style={{ scrollbarGutter: "stable both-edges" }}
      {...rest}
    >
      {children}
      <Container
        display={showScrollToTopButton ? "block" : "none"}
        marginTop={-4}
        position="fixed"
        top={scrollButtonPosition.top}
        left="50%"
        transform="translateX(-50%)"
        zIndex={999}
        colorScheme="gray"
      >
        <Button
          borderRadius="full"
          colorScheme="white"
          leftIcon={<IoMdArrowUp />}
          onClick={scrollToTop}
          ref={buttonRef}
          width="100%"
        >
          Scroll to Top
        </Button>
      </Container>
    </Box>
  );
};

export default ScrollingContainer;
