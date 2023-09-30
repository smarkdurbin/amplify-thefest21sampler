import { Badge, HStack, Heading, ListItem, VStack } from "@chakra-ui/react";
import Performer from "../_types/Performer";
import PerformerDislikeButton from "./PerformerDislikeButton";
import PerformerLikeButton from "./PerformerLikeButton";
import PerformerSpotifyButton from "./PerformerSpotifyButton";
import { useState } from "react";
import undislikePerformer from "../_functions/undislikePerformer";
import unlikePerformer from "../_functions/unlikePerformer";

interface PerformerListItemProps {
  dislikedPerformerIds: string[];
  likedPerformerIds: string[];
  performer: Performer;
  performerDislikeCallback?: (performerId: string) => void;
  performerUnlikeCallback?: (performerId: string) => void;
}

const PerformerListItem = ({
  dislikedPerformerIds,
  likedPerformerIds,
  performer,
  performerDislikeCallback,
  performerUnlikeCallback,
}: PerformerListItemProps) => {
  // State
  const [isDisliked, setIsDisliked] = useState<boolean>(
    dislikedPerformerIds?.includes(performer.id) ?? undefined
  );
  const [isLiked, setIsLiked] = useState<boolean>(
    likedPerformerIds?.includes(performer.id) ?? undefined
  );

  // Dislike callback
  const dislikeCallback = (performerId: string) => {
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

    // Execute performer dislike callback
    performerDislikeCallback && performerDislikeCallback(performerId);
  };

  // Like callback
  const likeCallback = (performerId: string) => {
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
  };

  // Dislike callback
  const undislikeCallback = (performerId: string) => {};

  // Unlike callback
  const unlikeCallback = (performerId: string) => {
    // Execute performer unliked callback
    performerUnlikeCallback && performerUnlikeCallback(performerId);

    // Set is liked
    setIsLiked(false);
  };

  return (
    <ListItem key={performer.id}>
      <HStack alignContent="center" spacing={4} width="100%">
        <VStack alignItems="start" flexGrow={1} spacing={1}>
          <Heading
            as="h2"
            fontSize="sm"
            noOfLines={1}
            maxWidth="100%"
            overflow="hidden"
            wordBreak={
              performer.name.split(" ").length === 1
                ? "break-all"
                : "break-word"
            }
          >
            {performer.name}
          </Heading>
          <Badge
            fontSize="xx-small"
            variant={performer.type === "Music" ? "outline" : "subtle"}
          >
            {performer.type}
          </Badge>
        </VStack>
        <HStack spacing={1}>
          <PerformerLikeButton
            fontSize="x-large"
            iconOnly={true}
            likeCallback={likeCallback}
            liked={isLiked}
            likedPerformerIds={likedPerformerIds}
            performerId={performer.id}
            unlikeCallback={unlikeCallback}
            variant="ghost"
          />
          <PerformerDislikeButton
            iconOnly={true}
            dislikeCallback={dislikeCallback}
            disliked={isDisliked}
            dislikedPerformerIds={dislikedPerformerIds}
            fontSize="x-large"
            performerId={performer.id}
            undislikeCallback={undislikeCallback}
            variant="ghost"
          />
          <PerformerSpotifyButton
            color="green.400"
            fontSize="x-large"
            iconOnly={true}
            performerName={performer.name}
            variant="ghost"
          />
        </HStack>
      </HStack>
    </ListItem>
  );
};

export default PerformerListItem;
