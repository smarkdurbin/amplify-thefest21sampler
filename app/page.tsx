"use client";

import ScrollingContainer from "./_components/ScrollingContainer";
import {
  Container,
  Heading,
  Flex,
  ListItem,
  List,
  Card,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  // Define instructions
  const instructions = [
    `Browse performers, or load a random performer`,
    `Click the Spotify button to search for that performer in your Spotify app`,
    `Use the like button to keep track of performers you want to see`,
    `Add liked performers to your schedule in The Fest 21 app`,
  ];

  return (
    <Flex
      className="Home"
      flexDirection="column"
      flexGrow={1}
      height="100%"
      width="100%"
    >
      <Head>
        <title>The Fest 21 (Unofficial) Sampler</title>
        <meta
          name="description"
          content="This site is not affiliated with The Fest"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ScrollingContainer>
        <Container>
          <Heading
            as="h2"
            fontFamily="Oswald"
            fontWeight="normal"
            marginTop={8}
            textAlign="center"
            textTransform="uppercase"
          >
            Start sampling
          </Heading>
          <List fontSize="lg" marginTop={4} spacing={2}>
            {instructions.map((instruction: string, idx) => (
              <ListItem key={idx}>
                <Card borderRadius="none" padding={2}>
                  <VStack lineHeight={1} spacing={1}>
                    <Heading
                      as="h3"
                      fontFamily="Oswald"
                      fontSize="lg"
                      fontWeight="normal"
                      textAlign="center"
                      textTransform="uppercase"
                      width="100%"
                    >
                      Step {idx + 1}
                    </Heading>
                    <Text fontSize="sm" lineHeight={1.3} textAlign="center">
                      {instruction}
                    </Text>
                  </VStack>
                </Card>
              </ListItem>
            ))}
          </List>
          <Text fontSize="sm" textAlign="center" marginTop={4}>
            {`This app doesn't collect or store personal information. Your likes and the record of random performers you have seen is stored browser storage, which you can clear at any time.`}
          </Text>
        </Container>
      </ScrollingContainer>
    </Flex>
  );
}
