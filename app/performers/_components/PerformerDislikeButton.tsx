"use client";

import { Button, ButtonProps, Icon, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { IoMdThumbsDown } from "react-icons/io";
import getDislikedPerformerIds from "../_functions/getDislikedPerformerIds";
import undislikePerformer from "../_functions/undislikePerformer";
import dislikePerformer from "../_functions/dislikePerformer";
import unlikePerformer from "../_functions/unlikePerformer";

interface PerformerLikeButtonProps extends ButtonProps {
  iconOnly?: boolean;
  dislikeCallback?: (performerId: string) => void;
  disliked?: boolean;
  dislikedPerformerIds: string[];
  performerId: string;
  undislikeCallback?: (performerId: string) => void;
}

const PerformerDislikeButton = ({
  iconOnly,
  dislikeCallback,
  disliked,
  dislikedPerformerIds,
  performerId,
  undislikeCallback,
  ...rest
}: PerformerLikeButtonProps) => {
  // State
  const [isDisliked, setIsDisliked] = useState<boolean>();

  // Hook
  useEffect(() => {
    // If liked null or undefined
    if (disliked == null) return;

    // Set is liked
    setIsDisliked(disliked);
  }, [disliked, performerId]);

  // Hook
  useEffect(() => {
    // If performer id is null
    if (performerId == null) return;

    // If liked performer IDs is null
    if (dislikedPerformerIds == null) return;

    // Set is liked
    setIsDisliked(dislikedPerformerIds.includes(performerId));
  }, [dislikedPerformerIds, performerId]);

  // Handle click
  const handleClick = useCallback(() => {
    // If is liked
    if (isDisliked) {
      // Undislike performer
      undislikePerformer(performerId).then(() => {
        // Set is disliked
        setIsDisliked(false);

        // Callback
        undislikeCallback && undislikeCallback(performerId);
      });
    } else {
      // Dislike performer
      dislikePerformer(performerId).then(() => {
        // Set is disliked
        setIsDisliked(true);

        // Callback
        dislikeCallback && dislikeCallback(performerId);
      });
    }
  }, [isDisliked, dislikeCallback, performerId, undislikeCallback]);

  return iconOnly ? (
    <IconButton
      aria-label={isDisliked ? "Unlike" : "Like"}
      icon={
        isDisliked ? (
          <Icon as={IoMdThumbsDown} color="red.400" />
        ) : (
          <Icon as={IoMdThumbsDown} />
        )
      }
      isRound={true}
      onClick={handleClick}
      {...rest}
    />
  ) : (
    <Button
      onClick={handleClick}
      leftIcon={
        isDisliked ? (
          <Icon as={IoMdThumbsDown} color="red.400" />
        ) : (
          <Icon as={IoMdThumbsDown} />
        )
      }
      {...rest}
    >
      {isDisliked ? `Undislike` : `Dislike`}
    </Button>
  );
};

export default PerformerDislikeButton;
