"use client";

import React, { ReactNode, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Flex, FlexProps } from "@chakra-ui/react";
import { useGlobalState } from "./GlobalStateProvider";
import withLoading, { WithLoadingProps } from "./withLoading";
import getPerformers from "../performers/_functions/getPerformers";
import getSeenRandomPerformerIds from "../performers/_functions/getSeenRandomPerformerIds";
import getLikedPerformerIds from "../performers/_functions/getLikedPerformerIds";
import useCurrentCredentials from "../performers/_hooks/useCurrentCredentials";
import addSeenRandomPerformerId from "../performers/_functions/addSeenRandomPerformerId";

interface AppProps extends FlexProps, WithLoadingProps {
  children: ReactNode;
}

const App = ({ children, setIsLoading }: AppProps) => {
  // Global state
  const {
    setState,
    state: { performers },
  } = useGlobalState();

  // Use current credentials
  const credentials = useCurrentCredentials();

  // Hook
  useEffect(() => {
    // If credentials null or undefined
    if (credentials == null) return;

    // Get performers
    getPerformers().then((_performers) => {
      // Set state
      setState((prev) => ({ ...prev, performers: _performers }));
    });

    return () => {
      // Set state
      setState((prev) => ({ ...prev, performers: undefined }));
    };
  }, [credentials, setState]);

  // Hook
  useEffect(() => {
    // If null or undefined
    if (performers == null) return;

    // Set is loading
    setIsLoading(false);

    return () => {
      // Set is loading
      setIsLoading(true);
    };
  }, [performers, setIsLoading]);

  return (
    <Flex className="App" flexDirection="column" flexGrow={1} height="100%">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Flex>
  );
};

export default withLoading(App);
