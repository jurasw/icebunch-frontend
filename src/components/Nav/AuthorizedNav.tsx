import {
  Avatar,
  Button,
  Flex,
  Stack,
  useColorMode,
  Text
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
      <Text
      _hover={{
        cursor: "pointer"
      }}
      onClick={() => {    
          user && navigate("/");
        }}
      >
          Ice Cream
      </Text>

      <Stack direction={"row"} spacing={7}>
        <Avatar
          _hover={{
            cursor: "pointer"
          }}
          onClick={() => {
          
            user && navigate("/my-profile");
          }}
          size={"sm"}
          src={"https://avatars.dicebear.com/api/male/username.svg"}
            />
        <Button
        onClick={logout}
        >
          Logout
        </Button>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Stack>
    </Flex>
  );
}
