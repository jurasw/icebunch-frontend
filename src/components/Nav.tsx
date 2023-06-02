import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Spacer,
  useColorMode,
  Text
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Flag from "./Nav/Flag";
import { Language, useAuthStore } from "../zustand";
import { useAuth } from "../hooks/useAuth";
import { Path } from "../pages/Paths";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const MenuItems = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>

      <Flag locale={Language.PL} src="../flag-pl.png" />
      <Flag locale={Language.EN} src="../flag-en.png" />
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  );
};

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();
  const navigate = useNavigate()

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton      
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none"}}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} w={"100%"}>
            <Box as={"a"} href="/">
              <Text
              as='b'
              >
              iceBunch
              </Text>
            </Box>
            <Spacer />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <MenuItems />
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {user ? (
              <>
                <Menu>
                  <MenuButton
                    onClick={() => {navigate(Path.MY_PROFILE)}}
                    ml={8}
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      as={"a"}
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  </MenuButton>
                </Menu>
                <Button
                  variant={"solid"}
                  colorScheme={"blue"}
                  size={"sm"}
                  ml={4}
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                  as={"a"}
                  href={Path.LOGIN}
                >
                  Sign in
                </Button>
                <Button
                  variant={"solid"}
                  colorScheme={"teal"}
                  size={"sm"}
                  mr={4}
                  as={"a"}
                  href={Path.REGISTER}
                >
                  Sign up
                </Button>
              </>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={3}>
              <MenuItems />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
