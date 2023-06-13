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
  Text,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Flag from "./Nav/Flag";
import { Language, useAuthStore } from "../zustand";
import { useAuth } from "../hooks/useAuth";
import { Path } from "../pages/Paths";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/queries/useUser";
import { UserDB } from "../models/User";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const MenuItems = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Button
        _hover={{
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(Path.HOME);
        }}
      >
        {t("ice-cream")}
      </Button>
      <Flag locale={Language.PL} src="/flag-pl.webp" />
      <Flag locale={Language.EN} src="/flag-en.webp" />

      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  );
};

export default function Nav() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAuthStore((state) => state.user);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { getUserFromEmail } = useUser();
  const [userData, setUserData] = useState<UserDB>();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const result = await getUserFromEmail(user.email);
        setUserData(result);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} w={"100%"}>
            <Box as={"a"} href={Path.INDEX}>
              <HStack>

              <Text as="b">iceBunch</Text>
              <Image
          boxSize={'1.8rem'}
          src='/logo.webp'
          >
            </Image>
            </HStack>

            </Box>
            <Spacer />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <MenuItems />
            </HStack>
            {/* <Text
          _hover={{
            cursor: "pointer"
          }}
          onClick={() => {navigate(Path.ABOUT)}}
          >{t('about')}</Text> */}
          </HStack>
          <Flex alignItems={"center"}>
            {user ? (
              <>
                <Menu>
                  <MenuButton
                    onClick={() => {
                      navigate(Path.MY_PROFILE);
                    }}
                    ml={8}
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar as={"a"} size={"sm"} src={userData?.avatarUrl} />
                  </MenuButton>
                </Menu>
                <Button
                  variant={"primaryOutlineButton"}
                  size={"sm"}
                  ml={4}
                  onClick={logout}
                >
                  {t("logout")}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={"primaryOutlineButton"}
                  size={"sm"}
                  mx={4}
                  as={"a"}
                  href={Path.LOGIN}
                >
                  {t("sign-in")}
                </Button>
                <Button
                  variant={"primaryButton"}
                  size={"sm"}
                  mr={4}
                  as={"a"}
                  href={Path.REGISTER}
                >
                  {t("sign-up")}
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
