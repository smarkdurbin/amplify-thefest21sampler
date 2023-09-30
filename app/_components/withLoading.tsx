"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Center,
  Flex,
  Spinner,
  useColorModeValue,
  useTheme,
  useToken,
} from "@chakra-ui/react";

export type WithLoadingProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const withLoading = <T extends WithLoadingProps = WithLoadingProps>(
  WrappedComponent: React.ComponentType<T>
) => {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithLoading = (props: Omit<T, keyof WithLoadingProps>) => {
    // State
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Loading background color
    const loadingBackgroundColor = useColorModeValue("white", "gray.900");

    return (
      <Flex
        className="withLoading"
        direction="column"
        flexGrow={1}
        height="100%"
        position="relative"
        width="100%"
      >
        {isLoading && (
          <Center
            backgroundColor={loadingBackgroundColor}
            height="100%"
            left={0}
            width="100%"
            position="absolute"
            top={0}
            zIndex={9999}
          >
            <Spinner />
          </Center>
        )}
        <WrappedComponent {...(props as T)} setIsLoading={setIsLoading} />
      </Flex>
    );
  };

  ComponentWithLoading.displayName = `withLoading(${displayName})`;

  return ComponentWithLoading;
};

export default withLoading;
