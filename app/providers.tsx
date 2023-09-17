"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Amplify } from "aws-amplify";
import awsExports from "@/src/aws-exports";
import theme from "./theme";
import { GlobalStateProvider } from "./_components/GlobalStateProvider";

Amplify.configure({ ...awsExports, ssr: true });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalStateProvider>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </GlobalStateProvider>
  );
}
