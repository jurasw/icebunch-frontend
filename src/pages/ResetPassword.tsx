import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ResetPasswordForm(): JSX.Element {
  const { token } = useParams();
  const { postNewPasswordMutation } = useAuth();
  const [password, setPassword] = useState("");

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const setNewPassword = () => {
    postNewPasswordMutation.mutate({
      password: password,
      resetPasswordToken: token!,
    });
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="background">
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Enter new password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" onChange={handlePassword} />
        </FormControl>
        <Stack spacing={6}>
          <Button
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={setNewPassword}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
