import { Center, Heading } from "@chakra-ui/react";
import { Button, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Path } from "./Paths";

export default function Confirm(): JSX.Element {
  const { token } = useParams();
  const { getConfirmMutation } = useAuth();

  const [confirmed, setConfirmed] = useState<boolean | null>(null);

  const checkConfirmation = () => {
    getConfirmMutation.mutate(token, {
      onSuccess: () => {
        setConfirmed(true);
      },
      onError: () => {
        setConfirmed(false);
      },
    });
  };

  useEffect(() => {
    checkConfirmation();
  }, []);

  return (
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
        bg="background"
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        {confirmed ? (
          <>
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Email successfully confirmed!
              </Heading>
            </Center>
            <Center
              fontSize={{ base: "sm", sm: "md" }}
              color={useColorModeValue("gray.800", "gray.400")}
            >
              Thank you for confirming your e-mail, and we wish you a pleasant
              use of the platform
            </Center>
            <Stack spacing={6}>
              <Button as={"a"} href={Path.HOME}>
                Go to App
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Center>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Confirmation failed!
              </Heading>
            </Center>
            <Center
              fontSize={{ base: "sm", sm: "md" }}
              color={useColorModeValue("gray.800", "gray.400")}
            >
              Please check your email again or contact support.
            </Center>
          </>
        )}
      </Stack>
    </Flex>
  );
}
