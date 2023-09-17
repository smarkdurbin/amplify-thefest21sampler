"use client";

import React, { useState, useEffect, useRef } from "react";
import { Box, BoxProps, Flex } from "@chakra-ui/react";

interface MainProps extends BoxProps {}

const Main = ({ children, ...rest }: MainProps) => {
  return (
    <Flex
      as="main"
      className="Main"
      flexDirection="column"
      flexGrow={1}
      overflow="hidden"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default Main;
