import { Center, Text } from "@chakra-ui/react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export default function ConfirmRequest(): JSX.Element {

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
          <>
            <Center
            >
            <Text
            size={'2xl'}
            >
                Email confirmation send. Please check your email.
                </Text>
            </Center>
          </>
    </Flex>
  );
}
