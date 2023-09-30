"use client";

import {
  Button,
  ButtonProps,
  ColorProps,
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
  color,
  performerName,
  ...rest
}: PerformerSpotifyButtonProps) => {
  return iconOnly ? (
    <IconButton
      aria-label="Search performer in Spotify app"
      as="a"
      href={`spotify://search/${performerName}`}
      icon={<Icon as={FaSpotify} color={color ? color : "green.500"} />}
      isRound={true}
      {...rest}
    />
  ) : (
    <Button
      as="a"
      href={`spotify://search/${performerName}`}
      leftIcon={<Icon as={FaSpotify} color={color ? color : "green.500"} />}
      target="_blank"
      {...rest}
    >
      Search on Spotify
    </Button>
  );
};

export default PerformerSpotifyButton;
