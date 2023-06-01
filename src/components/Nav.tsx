import {
  Box,
  Flex,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Collapse,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import {
  CloseIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import AuthorizedNav from "./Nav/AuthorizedNav";
import GuestNav from "./Nav/GuestNav";
import { useNavigate } from "react-router-dom";
import Flag from "./Nav/Flag";
import { Language, useAuthStore } from "../zustand";

export function Nav() {
  const { isOpen, onToggle } = useDisclosure();
  const user = useAuthStore((state) => state.user);
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            iceBunch
          </Text>
        </Flex>

        {user ? <AuthorizedNav /> : <GuestNav />}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
      {user ? <AuthorizedMobileNav /> : <GuestMobileNav />}
      </Collapse>
    </Box>
  );
}

const GuestMobileNav = () => {
  const navigate = useNavigate();

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <Text
      _hover={{
        cursor: "pointer"
      }}
      onClick={() => {    
          navigate("/");
        }}
      >
          Ice Cream
      </Text>
      <Text
      _hover={{
        cursor: "pointer"
      }}
      onClick={() => {    
          navigate("/");
        }}
      >
          About
      </Text>
    </Stack>
  );
};

const AuthorizedMobileNav = () => {
  const navigate = useNavigate();

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >

      <Text
      _hover={{
        cursor: "pointer"
      }}
      onClick={() => {    
          navigate("/");
        }}
      >
          Ice Cream
      </Text>

      <Text
      _hover={{
        cursor: "pointer"
      }}
      onClick={() => {    
          navigate("/");
        }}
      >
          About
      </Text>
      <Flag locale={Language.PL} src="../flag-pl.png" />
      <Flag locale={Language.EN} src="../flag-en.png" />
    </Stack>
  );
};

// interface NavItem {
//   label: string;
//   subLabel?: string;
//   children?: Array<NavItem>;
//   href?: string;
// }

// const NAV_ITEMS: Array<NavItem> = [];
