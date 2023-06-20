import { Center, Heading, Stack } from "@chakra-ui/react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function ConfirmRequest(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"sm"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={10}
        >
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              {t("email-confirm-title")}
            </Heading>
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            {t("email-confirm")}
          </Center>
        </Stack>
      </Flex>
    </>
  );
}
