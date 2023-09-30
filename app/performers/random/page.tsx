"use client";

import { useGlobalState } from "@/app/_components/GlobalStateProvider";
import withLoading, { WithLoadingProps } from "../../_components/withLoading";
import Performer from "../_types/Performer";
import shufflePerformers from "./shufflePerformers";
import {
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import addSeenRandomPerformerId from "../_functions/addSeenRandomPerformerId";
import getLikedPerformerIds from "../_functions/getLikedPerformerIds";
import getSeenRandomPerformerIds from "../_functions/getSeenRandomPerformerIds";
import getDislikedPerformerIds from "../_functions/getDislikedPerformerIds";
import RandomPerformer from "./RandomPerformer";
import filterRandomPerformers from "./filterRandomPerformers";
import { IoMdSettings } from "react-icons/io";
import clearSeenRandomPerformerIds from "../_functions/clearSeenRandomPerformerIds";

interface RandomProps extends WithLoadingProps {}

const PerformersRandom = ({ setIsLoading }: RandomProps) => {
  // Global state
  const {
    setState,
    state: { performers },
  } = useGlobalState();

  // State
  const [dislikedPerformerIds, setDislikedPerformerIds] = useState<string[]>();
  const [likedPerformerIds, setLikedPerformerIds] = useState<string[]>();
  const [randomPerformer, setRandomPerformer] = useState<Performer | null>();
  const [remainingRandomPerformers, setRemainingRandomPerformers] =
    useState<Performer[]>();
  const [showDislikedPerformers, setShowDislikedPerformers] =
    useState<boolean>();
  const [showLikedPerformers, setShowLikedPerformers] = useState<boolean>();
  const [showSeenRandomPerformers, setShowSeenRandomPerformers] =
    useState<boolean>();

  const handleClearRandomHistory = () => {
    // Clear seen random performers
    clearSeenRandomPerformerIds();
  };

  // New random performer callback
  const newRandomPerformerCallback = useCallback(() => {
    // If random performer null or undefined
    if (randomPerformer == null) return;

    // If remaining random performers null or undefined
    if (remainingRandomPerformers == null) return;

    // If remaining random performers length is zero
    if (remainingRandomPerformers.length === 0) {
      // Set random performer null
      setRandomPerformer(null);

      return;
    }

    // Add seen random performer
    addSeenRandomPerformerId(randomPerformer.id).then(() => {});

    // Define next performer
    const nextPerformer = remainingRandomPerformers.filter(
      ({ id }) => id !== randomPerformer.id
    )[0];

    // If next performer
    if (nextPerformer) {
      // Set remaining random performers
      setRemainingRandomPerformers(
        (prev) => prev?.filter(({ id }) => id !== nextPerformer.id)
        // .filter(({id}) => id !== randomPerformer.id)
      );

      // Set random performer
      setRandomPerformer(nextPerformer);
    } else {
      // Set remaining random performers
      setRemainingRandomPerformers([]);

      // Set random performer
      setRandomPerformer(null);
    }
  }, [randomPerformer, remainingRandomPerformers]);

  // Hook on component mount to set state
  useEffect(() => {
    // Get disliked performer IDs
    getDislikedPerformerIds().then((_dislikedPerformerIds) => {
      // Set disliked performer IDs
      setDislikedPerformerIds(_dislikedPerformerIds);
    });

    // Get liked performer IDs
    getLikedPerformerIds().then((_likedPerformerIds) => {
      // Set liked performer IDs
      setLikedPerformerIds(_likedPerformerIds);
    });

    // Set show disliked performers
    setShowDislikedPerformers(false);

    // Set show liked performers
    setShowLikedPerformers(false);

    // Set show seen random performers
    setShowSeenRandomPerformers(false);

    return () => {
      // Set disliked performer IDs
      setDislikedPerformerIds(undefined);

      // Set liked performer IDs
      setLikedPerformerIds(undefined);

      // Set show disliked performers
      setShowDislikedPerformers(undefined);

      // Set show liked performers
      setShowLikedPerformers(undefined);

      // Set show seen random performers
      setShowSeenRandomPerformers(undefined);
    };
  }, []);

  // Hook to set is loading
  useEffect(() => {
    // If random performer null or undefined
    if (randomPerformer == null) return;

    // Set is loading
    setIsLoading(false);

    return () => {
      // Set is loading
      setIsLoading(true);
    };
  }, [randomPerformer, setIsLoading]);

  // Hook to set remaining random performers when settings change
  useEffect(() => {
    // If performers null or undefined
    if (performers == null) return;

    // If filter settings not populated
    if (
      showDislikedPerformers == null ||
      showLikedPerformers == null ||
      showSeenRandomPerformers == null
    )
      return;

    // Filter random performers
    filterRandomPerformers(
      [...performers],
      showDislikedPerformers,
      showLikedPerformers,
      showSeenRandomPerformers
    ).then((filteredPerformers: Performer[]) => {
      // Set remaining random performers
      setRemainingRandomPerformers(shufflePerformers(filteredPerformers));
    });
  }, [
    performers,
    showDislikedPerformers,
    showLikedPerformers,
    showSeenRandomPerformers,
  ]);

  // Hook on remainin random performers
  useEffect(() => {
    // If remaining random performers length undefined
    if (randomPerformer == null && !remainingRandomPerformers?.length) {
      // Set show liked performers
      setShowLikedPerformers(false);

      // Set show disliked performers
      setShowDislikedPerformers(false);

      // Set is loading
      setIsLoading(false);
      return;
    }

    // If random performer undefined
    if (randomPerformer == null && remainingRandomPerformers?.length) {
      // Set random performer
      setRandomPerformer(remainingRandomPerformers[0]);

      // Set remaining random performers
      setRemainingRandomPerformers((prev) =>
        prev?.filter(({ id }) => id !== remainingRandomPerformers[0].id)
      );
    }
  }, [remainingRandomPerformers, randomPerformer, setIsLoading]);

  return (
    <Flex flexDir="column" height="100%" width="100%">
      <Flex flexDirection="column" flexGrow={1}>
        {randomPerformer && (
          <RandomPerformer
            dislikedPerformerIds={dislikedPerformerIds ?? []}
            likedPerformerIds={likedPerformerIds ?? []}
            newRandomPerformerCallback={newRandomPerformerCallback}
            performer={randomPerformer}
          />
        )}
        {randomPerformer == null && !remainingRandomPerformers?.length && (
          <Container flexGrow={1} marginTop={8}>
            <Center height="100%">
              <Text textAlign="center">
                There are no more random performers to show. Change visiblity
                settings or clear your history to load more random performers.
              </Text>
            </Center>
          </Container>
        )}
      </Flex>
      <Container display="flex" justifyContent="center" paddingBottom={12}>
        <Popover placement="top">
          <PopoverTrigger>
            <Button
              aria-label="Toggle settings"
              borderRadius="full"
              leftIcon={<IoMdSettings />}
              size="md"
              variant="outline"
            >
              Settings
            </Button>
          </PopoverTrigger>
          <PopoverContent border="none" borderRadius="sm" width="auto">
            <PopoverHeader
              fontWeight="bold"
              lineHeight={1}
              paddingX={4}
              paddingY={4}
            >
              Settings
            </PopoverHeader>
            <PopoverBody paddingX={4} paddingY={4}>
              <VStack alignItems="start" spacing={4}>
                <FormControl
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                >
                  <FormLabel htmlFor="show-disliked-performers" mb="0">
                    Show disliked performers
                  </FormLabel>
                  <Switch
                    id="show-disliked-performers"
                    isChecked={showDislikedPerformers}
                    isDisabled={!dislikedPerformerIds?.length}
                    marginLeft={4}
                    onChange={(event) =>
                      setShowDislikedPerformers(event.target.checked)
                    }
                    size="lg"
                  />
                </FormControl>
                <FormControl
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                >
                  <FormLabel htmlFor="show-liked-performers" mb="0">
                    Show liked performers
                  </FormLabel>
                  <Switch
                    id="show-liked-performers"
                    isChecked={showLikedPerformers}
                    isDisabled={!likedPerformerIds?.length}
                    marginLeft={4}
                    onChange={(event) =>
                      setShowLikedPerformers(event.target.checked)
                    }
                    size="lg"
                  />
                </FormControl>
                <FormControl
                  alignItems="center"
                  display="none"
                  justifyContent="space-between"
                >
                  <FormLabel htmlFor="show-seen-random-performers" mb="0">
                    Show seen
                  </FormLabel>
                  <Switch
                    id="show-seen-random-performers"
                    isChecked={showSeenRandomPerformers}
                    marginLeft={4}
                    onChange={(event) =>
                      setShowSeenRandomPerformers(event.target.checked)
                    }
                    size="lg"
                  />
                </FormControl>
                <Button
                  borderRadius="full"
                  onClick={handleClearRandomHistory}
                  width="100%"
                >
                  Clear history
                </Button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Container>
    </Flex>
  );
};

export default withLoading(PerformersRandom);
