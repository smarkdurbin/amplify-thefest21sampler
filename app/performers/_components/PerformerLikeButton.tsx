"use client";

import { Button, ButtonProps, Icon, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import getLikedPerformerIds from "../_functions/getLikedPerformerIds";
import unlikePerformer from "../_functions/unlikePerformer";
import likePerformer from "../_functions/likePerformer";

interface PerformerLikeButtonProps extends ButtonProps {
  iconOnly?: boolean;
  likeCallback?: (performerId: string) => void;
  liked?: boolean;
  performerId: string;
  unlikeCallback?: (performerId: string) => void;
}

const PerformerLikeButton = ({
  iconOnly,
  likeCallback,
  liked,
  performerId,
  unlikeCallback,
  ...rest
}: PerformerLikeButtonProps) => {
  // State
  const [isLiked, setIsLiked] = useState<boolean>();
  const [likedPerformerIds, setLikedPerformerIds] = useState<string[]>();

  // Hook
  useEffect(() => {
    // If liked null or undefined
    if (liked == null) {
      // Get liked performer IDs
      getLikedPerformerIds().then((_likedPerformerIds) => {
        // Set liked performer IDs
        setLikedPerformerIds(_likedPerformerIds);
      });
    } else {
      // Set is liked
      setIsLiked(liked);
    }
  }, [liked]);

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
          <Icon as={IoMdHeart} color="pink.400" />
        ) : (
          <Icon as={IoMdHeartEmpty} />
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
          <Icon as={IoMdHeart} color="pink.400" />
        ) : (
          <Icon as={IoMdHeartEmpty} />
        )
      }
      {...rest}
    >
      {isLiked ? `Unlike` : `Like`}
    </Button>
  );
};

export default PerformerLikeButton;
