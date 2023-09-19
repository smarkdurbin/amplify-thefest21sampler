"use client";

import { useGlobalState } from "@/app/_components/GlobalStateProvider";
import PerformerLikeButton from "../_components/PerformerLikeButton";
import PerformerSpotifyButton from "../_components/PerformerListSpotifyButton";
import withLoading, { WithLoadingProps } from "../../_components/withLoading";
import Performer from "../_types/Performer";
import shufflePerformers from "./_functions/shufflePerformers";
import {
  Center,
  Container,
  Button,
  Heading,
  VStack,
  Box,
  Flex,
  HStack,
  IconButton,
  VisuallyHidden,
  Badge,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdClock, IoMdShuffle } from "react-icons/io";
import addSeenRandomPerformerId from "../_functions/addSeenRandomPerformerId";
import clearSeenRandomPerformerIds from "../_functions/clearSeenRandomPerformerIds";
import getLikedPerformerIds from "../_functions/getLikedPerformerIds";
import getSeenRandomPerformerIds from "../_functions/getSeenRandomPerformerIds";

interface RandomProps extends WithLoadingProps {}

const Random = ({ setIsLoading }: RandomProps) => {
  // Global state
  const {
    setState,
    state: { performers },
  } = useGlobalState();

  // State
  const [likedPerformerIds, setLikedPerformerIds] = useState<string>();
  const [randomPerformer, setRandomPerformer] = useState<Performer>();
  const [remainingRandomPerformers, setRemainingRandomPerformers] = useState<
    Performer[]
  >([]);
  const [seenRandomPerformerIds, setSeenRandomPerformerIds] =
    useState<string[]>();

  // Hook
  useEffect(() => {
    // Get liked performer IDs
    getLikedPerformerIds().then((_likedPerformerIds) => {
      // Set liked performer IDs
      setLikedPerformerIds(_likedPerformerIds);
    });

    return () => {
      // Set liked performer IDs
      setLikedPerformerIds(undefined);
    };
  }, []);

  // Hook
  useEffect(() => {
    // Get send random performer IDs
    getSeenRandomPerformerIds().then((_seenRandomPerformerIds) => {
      // Set seen random performer IDs
      setSeenRandomPerformerIds(_seenRandomPerformerIds);
    });
    return () => {
      // Set seen random performer IDs
      setSeenRandomPerformerIds(undefined);
    };
  }, []);

  // Hook
  useEffect(() => {
    // If null or undefined
    if (performers == null || seenRandomPerformerIds == null) return;

    // Set remaining random performers
    setRemainingRandomPerformers(
      shufflePerformers(
        [...performers].filter(({ id }) => !seenRandomPerformerIds.includes(id))
      )
    );
  }, [performers, seenRandomPerformerIds]);

  // Hook
  useEffect(() => {
    // If reamining random performers length is less than 1
    if (remainingRandomPerformers.length < 1) return;

    // Define random performer
    const _randomPerformer = remainingRandomPerformers[0];

    // Set random performer
    setRandomPerformer(_randomPerformer);

    // Add seen random performer ID
    addSeenRandomPerformerId(_randomPerformer.id);
  }, [remainingRandomPerformers]);

  // Hook
  useEffect(() => {
    // If random performer null or undefined
    if (randomPerformer == null) return;

    // If likedPerformerIds null or undefined
    if (likedPerformerIds == null) return;

    // Set is loading
    setIsLoading(false);

    return () => {
      // Set is loading
      setIsLoading(true);
    };
  }, [likedPerformerIds, randomPerformer, setIsLoading]);

  // Function to handle new random performer
  const handleNewRandomPerformer = () => {
    // If random performer is null or undefined
    if (randomPerformer == null) return;

    // If remaining random performers length is zero
    if (remainingRandomPerformers.length === 0) {
      // Clear seen random performers
      clearSeenRandomPerformerIds().then(() => {
        // Set remaining random performers
        setRemainingRandomPerformers(performers ?? []);
      });

      return;
    }

    // New remaining random performers
    const newRemainingRandomPerformers = remainingRandomPerformers.filter(
      (performer) => performer.id !== randomPerformer.id
    );

    // Set remaining random performers
    setRemainingRandomPerformers(newRemainingRandomPerformers);
  };

  const handleClearRandomHistory = () => {
    // Clear seen random performers
    clearSeenRandomPerformerIds();
  };

  return (
    <Flex flexDir="column" height="100%" width="100%">
      {randomPerformer && (
        <>
          <Box flexGrow={1}>
            <Container height="100%">
              <Center height="100%">
                <VisuallyHidden>
                  <Heading as="h2">Random performer</Heading>
                </VisuallyHidden>
                <VStack spacing={8} width="100%">
                  <Heading
                    as="h3"
                    fontSize="xx-large"
                    lineHeight={1.5}
                    noOfLines={1}
                    textAlign="center"
                  >
                    {randomPerformer?.name}
                  </Heading>
                </VStack>
              </Center>
            </Container>
          </Box>
          <Box>
            <Container>
              <HStack
                justifyContent="center"
                marginBottom={24}
                spacing={4}
                width="100%"
              >
                <PerformerLikeButton
                  iconOnly={true}
                  liked={undefined}
                  performerId={randomPerformer.id}
                  size="sm"
                  transform="scale(2)"
                  variant="outline"
                />

                <IconButton
                  aria-label="New random performer"
                  colorScheme="white"
                  icon={<IoMdShuffle />}
                  isRound={true}
                  marginX={12}
                  onClick={handleNewRandomPerformer}
                  size="lg"
                  transform="scale(2)"
                />
                <PerformerSpotifyButton
                  iconOnly={true}
                  performerName={randomPerformer.name}
                  size="sm"
                  transform="scale(2)"
                  variant="outline"
                />
              </HStack>
              <Flex marginBottom={12} justifyContent="center">
                <Button
                  borderRadius="full"
                  leftIcon={<IoMdClock />}
                  onClick={handleClearRandomHistory}
                  size="sm"
                  // variant="outline"
                >
                  Clear history
                </Button>
              </Flex>
            </Container>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default withLoading(Random);
