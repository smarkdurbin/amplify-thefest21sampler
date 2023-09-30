import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  VStack,
  VisuallyHidden,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import PerformerLikeButton from "../_components/PerformerLikeButton";
import PerformerDislikeButton from "../_components/PerformerDislikeButton";
import PerformerSpotifyButton from "../_components/PerformerSpotifyButton";
import { IoMdClock, IoMdShuffle } from "react-icons/io";
import Performer from "../_types/Performer";
import unlikePerformer from "../_functions/unlikePerformer";
import undislikePerformer from "../_functions/undislikePerformer";
import clearSeenRandomPerformerIds from "../_functions/clearSeenRandomPerformerIds";

interface RandomPerformerProps {
  dislikedPerformerIds?: string[];
  likedPerformerIds?: string[];
  newRandomPerformerCallback: () => void;
  performer: Performer;
}

const RandomPerformer = ({
  dislikedPerformerIds,
  likedPerformerIds,
  newRandomPerformerCallback,
  performer,
}: RandomPerformerProps) => {
  // State
  const [isDisliked, setIsDisliked] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>();

  // Hook on component mount
  useEffect(() => {
    // If disliked performer IDs
    if (dislikedPerformerIds) {
      // Set is disliked
      setIsDisliked(dislikedPerformerIds.includes(performer.id));
    }

    // If liked performer IDs
    if (likedPerformerIds) {
      // Set is liked
      setIsLiked(likedPerformerIds.includes(performer.id));
    }
  }, [dislikedPerformerIds, likedPerformerIds, performer.id]);

  // Dislike callback
  const dislikeCallback = useCallback(
    (performerId: string) => {
      // Set is disliked
      setIsDisliked(true);

      // If is liked
      if (isLiked) {
        // Unlike performer
        unlikePerformer(performerId).then(() => {
          // Set is liked false
          setIsLiked(false);
        });
      }
    },
    [isLiked]
  );

  // Handle clear random history
  const handleClearRandomHistory = () => {
    // Clear seen random performers
    clearSeenRandomPerformerIds();
  };

  // Like callback
  const likeCallback = useCallback(
    (performerId: string) => {
      // Set is liked
      setIsLiked(true);

      // If is disliked
      if (isDisliked) {
        // Undislike performer
        undislikePerformer(performerId).then(() => {
          // Set is disliked false
          setIsDisliked(false);
        });
      }
    },
    [isDisliked]
  );

  // Dislike callback
  const undislikeCallback = (performerId: string) => {};

  // Unlike callback
  const unlikeCallback = (performerId: string) => {
    // Set is liked
    setIsLiked(false);
  };

  return (
    <>
      <Box flexGrow={1}>
        <Container height="100%">
          <Center flexDirection="column" height="100%">
            <VisuallyHidden as="h2">Random performer</VisuallyHidden>
            <VStack spacing={4} width="100%">
              <Heading
                as="h3"
                fontSize={
                  performer?.name?.length > 18 ? "x-large" : " xx-large"
                }
                lineHeight={1.3}
                maxWidth="100%"
                overflowWrap="break-word"
                textAlign="center"
              >
                {performer?.name}
              </Heading>
              <Badge
                variant={performer.type === "Music" ? "outline" : "subtle"}
              >
                {performer.type}
              </Badge>
            </VStack>
            <PerformerSpotifyButton
              borderColor="green.500"
              borderRadius="full"
              color="black"
              colorScheme="green"
              marginTop={12}
              performerName={performer.name}
              size="lg"
            />
          </Center>
        </Container>
      </Box>
      <Box>
        <Container>
          <HStack
            justifyContent="center"
            marginBottom={16}
            spacing={4}
            width="100%"
          >
            <PerformerLikeButton
              fontSize="large"
              iconOnly={true}
              likeCallback={likeCallback}
              liked={isLiked}
              likedPerformerIds={likedPerformerIds ?? []}
              performerId={performer.id}
              size="sm"
              transform="scale(2)"
              unlikeCallback={unlikeCallback}
              variant="ghost"
            />
            <IconButton
              aria-label="New random performer"
              colorScheme="white"
              fontSize="x-large"
              icon={<IoMdShuffle />}
              isRound={true}
              marginX={12}
              onClick={newRandomPerformerCallback}
              size="lg"
              transform="scale(2)"
            />
            <PerformerDislikeButton
              fontSize="large"
              iconOnly={true}
              dislikeCallback={dislikeCallback}
              disliked={isDisliked}
              dislikedPerformerIds={dislikedPerformerIds ?? []}
              performerId={performer.id}
              size="sm"
              transform="scale(2)"
              undislikeCallback={undislikeCallback}
              variant="ghost"
            />
          </HStack>
        </Container>
      </Box>
    </>
  );
};

export default RandomPerformer;
