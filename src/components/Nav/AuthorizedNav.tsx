import {
  Avatar,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import Flag from "./Flag";
import { Language, useAuthStore } from "../../zustand";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function authorizedNav() {
  const { logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <Flex alignItems={"center"}>
      <Flag locale={Language.PL} src="../flag-pl.png" />
      <Flag locale={Language.EN} src="../flag-en.png" />
      <Stack direction={"row"} spacing={7}>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar
              size={"sm"}
              src={"https://avatars.dicebear.com/api/male/username.svg"}
            />
          </MenuButton>
          <MenuList alignItems={"center"}>
            <br />
            <Center>
              <Avatar
                size={"2xl"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
            </Center>
            <br />
            <Center>
              <p>{user?.email}</p>
            </Center>
            <br />
            <MenuDivider />
            <MenuItem
              onClick={() => {
                user && navigate("/my-profile");
              }}
            >
              Your Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                user && navigate("/");
              }}
            >
              Ice Cream
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Flex>
  );
}
