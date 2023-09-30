"use client";

import React, { useEffect, useMemo, useState } from "react";
import Performer from "./_types/Performer";
import withLoading, { WithLoadingProps } from "../_components/withLoading";
import PerformerList from "./_components/PerformerList";
import {
  Box,
  Container,
  Flex,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useGlobalState } from "../_components/GlobalStateProvider";
import PerformerListFilter from "./_components/PerformerListFilter";
import Fuse from "fuse.js";
import getLikedPerformerIds from "./_functions/getLikedPerformerIds";
import getSeenRandomPerformerIds from "./_functions/getSeenRandomPerformerIds";
import getDislikedPerformerIds from "./_functions/getDislikedPerformerIds";

interface PerformersProps extends WithLoadingProps {}

enum SearchState {
  LOADING = "LOADING",
  NO_RESULTS = "NO_RESULTS",
  NONE = "NONE",
  RESULTS = "RESULTS_FOUND",
}

const Performers = ({ setIsLoading }: PerformersProps) => {
  // Global state
  const {
    state: { performers },
  } = useGlobalState();

  // State
  const [dislikedPerformerIds, setDislikedPerformerIds] = useState<string[]>();
  const [filteredPerformers, setFilteredPerformers] = useState<Performer[]>();
  const [likedPerformerIds, setLikedPerformerIds] = useState<string[]>();
  const [searchState, setSearchState] = useState<SearchState>(SearchState.NONE);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [seenRandomPerformerIds, setSeenRandomPerformerIds] =
    useState<string[]>();

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
    // If performers is null or undefined
    if (performers == null) return;

    // Set filtered performers
    setFilteredPerformers(performers);

    return () => {
      // Set filteredPerformers
      setFilteredPerformers(undefined);
    };
  }, [performers]);

  // Hook
  useEffect(() => {
    // If performers is null or undefined
    if (performers == null) return;

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

    return () => {
      // Set liked performer IDs
      setLikedPerformerIds(undefined);
    };
  }, [performers]);

  // Hook
  useEffect(() => {
    // If filteredPerformers null or undefined
    if (filteredPerformers == null) return;

    // If liked performer IDs null or undefined
    if (likedPerformerIds == null) return;

    // If seen random performer IDs null or undefined
    if (seenRandomPerformerIds == null) return;

    // Set is loading
    setIsLoading(false);

    return () => {
      // Set is loading
      setIsLoading(true);
    };
  }, [
    filteredPerformers,
    likedPerformerIds,
    seenRandomPerformerIds,
    setIsLoading,
  ]);

  // Hook
  useEffect(() => {
    // Set search state
    setSearchState(SearchState.LOADING);
  }, [searchQuery]);

  // Hook
  useEffect(() => {
    // If filtered performers null or undefined
    if (filteredPerformers == null) return;

    // If filtered performers length is zero
    if (filteredPerformers.length === 0) setSearchState(SearchState.NO_RESULTS);

    // If filtered performers length is zero
    if (filteredPerformers.length > 0) setSearchState(SearchState.RESULTS);
  }, [filteredPerformers]);

  // Fuse instance
  const fuse = useMemo(() => {
    // Fuse options
    const options = {
      includeScore: true,
      includeMatches: true,
      threshold: 0.2,
      keys: ["name"],
    };

    return new Fuse(performers ?? [], options);
  }, [performers]);

  // Hook
  useEffect(() => {
    // Filter performers
    const filterPerformers = (value: string) => {
      // If search term is an empty string
      if (value == "") {
        // Set filtered performers
        setFilteredPerformers(performers);

        return;
      }

      // Define results
      const results = fuse.search(value).map(({ item }) => item as Performer);

      // Set filtered performers
      setFilteredPerformers(results);
    };

    // Filter performers
    filterPerformers(searchQuery);
  }, [fuse, performers, searchQuery]);

  return (
    <Flex
      className="Performers"
      flexDirection="column"
      flexGrow={1}
      overflow="hidden"
    >
      <Box backgroundColor="blackAlpha.400">
        <Container>
          <PerformerListFilter
            changeCallback={() => {
              setSearchState(SearchState.LOADING);
            }}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Container>
      </Box>
      <VisuallyHidden>
        <Heading as="h2">Performers</Heading>
      </VisuallyHidden>
      {searchState === SearchState.LOADING && (
        <Container marginTop={8} textAlign="center">
          <HStack justifyContent="center" width="100%">
            <Spinner size="sm" />
            <Text>Loading results</Text>
          </HStack>
        </Container>
      )}
      {searchState === SearchState.RESULTS && filteredPerformers?.length && (
        <PerformerList
          dislikedPerformerIds={dislikedPerformerIds ?? []}
          likedPerformerIds={likedPerformerIds ?? []}
          performers={filteredPerformers ?? []}
        />
      )}
      {searchState === SearchState.NO_RESULTS && (
        <Container marginTop={8}>
          <VStack spacing={6} width="100%">
            <Text>{`No results matched your search`}</Text>
          </VStack>
        </Container>
      )}
    </Flex>
  );
};

export default withLoading(Performers);
