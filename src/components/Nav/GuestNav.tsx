import {
  Button,
  Stack,
} from "@chakra-ui/react";
import Flag from "./Flag";
import { Language } from "../../zustand";


export default function GuestNav() {

  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={"flex-end"}
      direction={"row"}
      spacing={6}
    >
      <Flag locale={Language.PL} src="../flag-pl.png" />
      <Flag locale={Language.EN} src="../flag-en.png" />
      <Button
        as={"a"}
        href={"/login"}
        fontSize={"sm"}
        fontWeight={400}
        variant={"link"}
      >
        Sign In
      </Button>
      <Button
        as={"a"}
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"pink.400"}
        href={"/register"}
        _hover={{
          bg: "pink.300",
        }}
      >
        Sign Up
      </Button>
    </Stack>
  );
}
