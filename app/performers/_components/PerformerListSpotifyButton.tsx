"use client";

import {
  Button,
  ButtonProps,
  Icon,
  IconButton,
  VisuallyHidden,
} from "@chakra-ui/react";
import React from "react";
import { FaSpotify } from "react-icons/fa";

interface PerformerSpotifyButtonProps extends ButtonProps {
  iconOnly?: boolean;
  performerName: string;
}

const PerformerSpotifyButton = ({
  iconOnly,
  performerName,
  ...rest
}: PerformerSpotifyButtonProps) => {
  return iconOnly ? (
    <IconButton
      aria-label="Search performer in Spotify app"
      as="a"
      href={`spotify://search/${performerName}`}
      icon={<Icon as={FaSpotify} color="green.500" />}
      isRound={true}
      {...rest}
    />
  ) : (
    <Button
      as="a"
      href={`spotify://search/${performerName}`}
      leftIcon={<Icon as={FaSpotify} color="green.500" />}
      target="_blank"
      {...rest}
    >
      Spotify
    </Button>
  );
};

export default PerformerSpotifyButton;
