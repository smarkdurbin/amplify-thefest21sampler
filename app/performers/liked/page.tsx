"use client";
import { useGlobalState } from "@/app/_components/GlobalStateProvider";
import PerformerList from "../_components/PerformerList";
import withLoading, { WithLoadingProps } from "../../_components/withLoading";
import Performer from "../_types/Performer";
import {
  Box,
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
import getDislikedPerformerIds from "../_functions/getDislikedPerformerIds";

interface LikedPerformersProps extends WithLoadingProps {}

const PerformersLiked = ({ setIsLoading }: LikedPerformersProps) => {
  // Global state
  const {
    state: { performers },
  } = useGlobalState();

  // State
  const [dislikedPerformerIds, setDislikedPerformerIds] = useState<string[]>();
  const [likedPerformers, setLikedPerformers] = useState<Performer[]>();
  const [likedPerformerIds, setLikedPerformerIds] = useState<string[]>();

  // Hook
  useEffect(() => {
    // Get disliked performer IDs
    getDislikedPerformerIds().then((_dislikedPerformers) => {
      // Set disliked performer IDs
      setDislikedPerformerIds(_dislikedPerformers);
    });
  }, []);

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

  // Performer dislike callback
  const performerDislikeCallback = (performerId: string) => {
    // Set liked performers
    setLikedPerformers((prev) => prev?.filter(({ id }) => performerId !== id));
  };

  // Performer unlike callback
  const performerUnlikeCallback = (performerId: string) => {
    // Set liked performers
    setLikedPerformers((prev) => prev?.filter(({ id }) => performerId !== id));
  };

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
        <>
          <Box backgroundColor="whiteAlpha.200" paddingY={2}>
            <Text
              fontFamily="Oswald"
              fontSize="small"
              textAlign="center"
              textTransform="uppercase"
            >
              You like ({likedPerformers?.length}) performer
              {likedPerformers?.length > 1 ? "s" : ""}
            </Text>
          </Box>
          <PerformerList
            dislikedPerformerIds={dislikedPerformerIds ?? []}
            likedPerformerIds={likedPerformerIds ?? []}
            performers={likedPerformers}
            performerDislikeCallback={performerDislikeCallback}
            performerUnlikeCallback={performerUnlikeCallback}
          />
        </>
      ) : (
        <Center height="100%" width="100%">
          <Container>
            <VStack spacing={8} width="100%">
              <Text>{`You haven't liked any performers yet.`}</Text>
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

export default withLoading(PerformersLiked);
