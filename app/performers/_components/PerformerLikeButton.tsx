"use client";

import { Button, ButtonProps, Icon, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { IoMdThumbsUp } from "react-icons/io";
import getLikedPerformerIds from "../_functions/getLikedPerformerIds";
import unlikePerformer from "../_functions/unlikePerformer";
import likePerformer from "../_functions/likePerformer";
import undislikePerformer from "../_functions/undislikePerformer";

interface PerformerLikeButtonProps extends ButtonProps {
  iconOnly?: boolean;
  likeCallback?: (performerId: string) => void;
  liked?: boolean;
  likedPerformerIds: string[];
  performerId: string;
  unlikeCallback?: (performerId: string) => void;
}

const PerformerLikeButton = ({
  iconOnly,
  likeCallback,
  liked,
  likedPerformerIds,
  performerId,
  unlikeCallback,
  ...rest
}: PerformerLikeButtonProps) => {
  // State
  const [isLiked, setIsLiked] = useState<boolean>();

  // Hook
  useEffect(() => {
    // If liked null or undefined
    if (liked == null) return;

    // Set is liked
    setIsLiked(liked);
  }, [liked, performerId]);

  // Hook
  useEffect(() => {
    // If performer id is null
    if (performerId == null) return;

    // If liked performer IDs is null
    if (likedPerformerIds == null) return;

    // Set is liked
    setIsLiked(likedPerformerIds.includes(performerId));
  }, [likedPerformerIds, performerId]);

  // Handle click
  const handleClick = useCallback(() => {
    // If is liked
    if (isLiked) {
      // Unlike performer
      unlikePerformer(performerId).then(() => {
        // Set is liked
        setIsLiked(false);

        // Callback
        unlikeCallback && unlikeCallback(performerId);
      });
    } else {
      // Like performer
      likePerformer(performerId).then(() => {
        // Set is liked
        setIsLiked(true);

        // Callback
        likeCallback && likeCallback(performerId);
      });
    }
  }, [isLiked, likeCallback, performerId, unlikeCallback]);

  return iconOnly ? (
    <IconButton
      aria-label={isLiked ? "Unlike" : "Like"}
      icon={
        isLiked ? (
          <Icon as={IoMdThumbsUp} color="blue.400" />
        ) : (
          <Icon as={IoMdThumbsUp} />
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
        isLiked ? (
          <Icon as={IoMdThumbsUp} color="blue.400" />
        ) : (
          <Icon as={IoMdThumbsUp} />
        )
      }
      {...rest}
    >
      {isLiked ? `Unlike` : `Like`}
    </Button>
  );
};

export default PerformerLikeButton;
