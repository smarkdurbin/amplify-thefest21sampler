"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  List,
  ListItem,
  HStack,
  Heading,
} from "@chakra-ui/react";
import PerformerLikeButton from "./PerformerLikeButton";
import PerformerSpotifyButton from "./PerformerListSpotifyButton";
import ScrollingContainer from "@/app/_components/ScrollingContainer";
import Performer from "../_types/Performer";

interface PerformerListProps {
  likedPerformerIds: string[];
  performers: Performer[];
  performerUnlikeCallback?: (performerId: string) => void;
}

const PerformerList = ({
  likedPerformerIds,
  performers,
  performerUnlikeCallback = () => {},
}: PerformerListProps) => {
  return (
    <Box flexGrow={1} overflow="hidden">
      <ScrollingContainer>
        <Container>
          <List marginTop={4} spacing={4}>
            {performers.map((performer, idx) => (
              <ListItem borderColor="whiteAlpha.100" key={performer.id}>
                <HStack alignContent="center" spacing={4} width="100%">
                  <Heading as="h2" flexGrow={1} fontSize="md" noOfLines={1}>
                    {performer.name}
                  </Heading>
                  <HStack spacing={2}>
                    <PerformerLikeButton
                      iconOnly={true}
                      liked={
                        likedPerformerIds?.includes(performer.id) ?? undefined
                      }
                      performerId={performer.id}
                      unlikeCallback={performerUnlikeCallback}
                      variant="outline"
                    />
                    <PerformerSpotifyButton
                      iconOnly={true}
                      performerName={performer.name}
                      variant="outline"
                    />
                  </HStack>
                </HStack>
              </ListItem>
            ))}
          </List>
        </Container>
      </ScrollingContainer>
    </Box>
  );
};

export default PerformerList;
