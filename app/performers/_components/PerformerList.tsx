"use client";

import {
  Box,
  Container,
  List,
  ListItem,
  HStack,
  Heading,
  VStack,
  Badge,
  Icon,
} from "@chakra-ui/react";
import PerformerLikeButton from "./PerformerLikeButton";
import PerformerSpotifyButton from "./PerformerSpotifyButton";
import ScrollingContainer from "@/app/_components/ScrollingContainer";
import Performer from "../_types/Performer";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import PerformerDislikeButton from "./PerformerDislikeButton";
import PerformerListItem from "./PerformerListItem";

interface PerformerListProps {
  dislikedPerformerIds: string[];
  likedPerformerIds: string[];
  performers: Performer[];
  performerDislikeCallback?: (performerId: string) => void;
  performerUnlikeCallback?: (performerId: string) => void;
}

const PerformerList = ({
  dislikedPerformerIds,
  likedPerformerIds,
  performers,
  performerDislikeCallback,
  performerUnlikeCallback,
}: PerformerListProps) => {
  return (
    <Box flexGrow={1} overflow="hidden">
      <ScrollingContainer>
        <Container>
          <List marginTop={4} spacing={4}>
            {performers.map((performer, idx) => (
              <PerformerListItem
                key={idx}
                dislikedPerformerIds={dislikedPerformerIds}
                likedPerformerIds={likedPerformerIds}
                performer={performer}
                performerDislikeCallback={performerDislikeCallback}
                performerUnlikeCallback={performerUnlikeCallback}
              />
            ))}
          </List>
        </Container>
      </ScrollingContainer>
    </Box>
  );
};

export default PerformerList;
