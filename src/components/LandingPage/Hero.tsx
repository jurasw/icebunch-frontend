import { Box, Container, Text, Button, Stack } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Container
      minW={"100%"}
      h={"95vh"}
      //   bgGradient="linear(to-l, #7928CA, #FF0080)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        as={Box}
        textAlign={"center"}
        justifyContent={"center"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Text
          lineHeight={"110%"}
          bgGradient="linear(to-l,  #0043ff, #5bfaff)"
          bgClip="text"
          fontSize="8xl"
          fontWeight="extrabold"
          textTransform="uppercase"
        >
          Welcome to <br />
          the Ice cream world
        </Text>
        <Text color={"gray.500"}>
          Monetize your content by charging your most loyal readers and reward
          them loyalty points. Give back to your loyal readers by granting them
          access to your pre-releases and sneak-peaks.
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button variant="primaryButton">Get Started</Button>
          <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
