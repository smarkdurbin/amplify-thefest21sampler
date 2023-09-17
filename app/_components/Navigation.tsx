import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Square,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  IoMdCalendar,
  IoMdHeart,
  IoMdHome,
  IoMdList,
  IoMdMicrophone,
  IoMdShuffle,
} from "react-icons/io";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

type NavLink = {
  icon: IconType;
  title: string;
  to: string;
};

const Navigation = () => {
  // Hooks
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    {
      icon: IoMdHome,
      title: "Home",
      to: "/",
    },
    {
      icon: IoMdList,
      title: "Browse",
      to: "/performers",
    },
    {
      icon: IoMdShuffle,
      title: "Random",
      to: "/performers/random",
    },
    {
      icon: IoMdHeart,
      title: "Liked",
      to: "/performers/liked",
    },
  ];

  return (
    <HStack as="nav" justifyContent="space-between" spacing={0}>
      {navLinks.map((link) => (
        <Square
          as={Link}
          href={link.to}
          flexDir="column"
          key={link.to}
          lineHeight={1}
          paddingY={6}
          opacity={pathname == link.to ? 0.5 : 1}
          pointerEvents={pathname == link.to ? "none" : "all"}
          size="5rem"
          textAlign="center"
        >
          <Icon as={link.icon} display="block" margin="0px auto" />
          <Text
            as="span"
            display="block"
            fontFamily="Oswald"
            fontSize="sm"
            marginTop={3}
            textTransform="uppercase"
          >
            {link.title}
          </Text>
        </Square>
      ))}
    </HStack>
  );
};

export default Navigation;
