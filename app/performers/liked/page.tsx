"use client";
import { useGlobalState } from "@/app/_components/GlobalStateProvider";
import PerformerList from "../_components/PerformerList";
import withLoading, { WithLoadingProps } from "../../_components/withLoading";
import Performer from "../_types/Performer";
import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import getLikedPerformerIds from "../_functions/getLikedPerformerIds";

interface LikedPerformersProps extends WithLoadingProps {}

const LikedPerformers = ({ setIsLoading }: LikedPerformersProps) => {
  // Global state
  const {
    state: { performers },
  } = useGlobalState();

  // State
  const [likedPerformers, setLikedPerformers] = useState<Performer[]>();
  const [likedPerformerIds, setLikedPerformerIds] = useState<string[]>();

  // Hook
  useEffect(() => {
    // Get liked performer IDs
    getLikedPerformerIds().then((_likedPerformers) => {
      // Set liked performer IDs
      setLikedPerformerIds(_likedPerformers);
    });
  }, []);

  // Hook
  useEffect(() => {
    // If liked performer ids null or undefined
    if (likedPerformerIds == null) return;

    // If performers null or undefined
    if (performers == null) return;

    // Set liked performers
    setLikedPerformers(
      performers.filter(({ id }) => likedPerformerIds.includes(id))
    );
  }, [likedPerformerIds, performers]);

  // Hook
  useEffect(() => {
    // If liked performers null or undefined
    if (likedPerformers == null) return;

    // Set is loading
    setIsLoading(false);

    return () => {
      // Set is loading
      setIsLoading(true);
    };
  }, [likedPerformers, setIsLoading]);

  return (
    <Flex
      className="Performers"
      flexDirection="column"
      flexGrow={1}
      overflow="hidden"
    >
      <VisuallyHidden>
        <Heading as="h2">Liked performers</Heading>
      </VisuallyHidden>
      {likedPerformers?.length ? (
        <PerformerList
          likedPerformerIds={likedPerformerIds ?? []}
          performers={likedPerformers}
          performerUnlikeCallback={(performerId) =>
            setLikedPerformers((prev) =>
              prev?.filter(({ id }) => performerId !== id)
            )
          }
        />
      ) : (
        <Center height="100%" width="100%">
          <Container>
            <VStack spacing={8} width="100%">
              <Text>{`You haven't liked any performers yet`}</Text>
              <VStack width="100%">
                <Link href="/performers" passHref legacyBehavior>
                  <Button borderRadius="full" width="100%">
                    Browse performers
                  </Button>
                </Link>
                <Link href="/performers/random" passHref legacyBehavior>
                  <Button borderRadius="full" width="100%">
                    Random performer
                  </Button>
                </Link>
              </VStack>
            </VStack>
          </Container>
        </Center>
      )}
    </Flex>
  );
};

export default withLoading(LikedPerformers);
