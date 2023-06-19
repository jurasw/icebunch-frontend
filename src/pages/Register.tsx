import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../hooks/useAuth";
import OAuthButtonGroup from "../components/Login/OAuthButtonGroup";
import { Path } from "./Paths";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../zustand";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const { formSignupMutation } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(Path.ICE_CREAMS);
    }
  });

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const register = () => {
    formSignupMutation.mutate({ email, password });
  };

  return (
    <>
      <Helmet>
        <title>{t('sign-up-header')}</title>
        <meta name="description" content='Register free to the iceBunch' />
      </Helmet>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6} w={500}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}> {t("sign-up-header")}</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              {t("sign-up-header2")}
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>{t("email-adress")}</FormLabel>
                <Input type="email" onChange={handleEmail} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>{t("password")}</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={handlePassword}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confir-password" isRequired>
                <FormLabel>{t("confirm-password")}</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={handlePassword}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Button variant={"primaryButton"} onClick={register}>
                  {t("sign-up")}
                </Button>
              </Stack>
              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  {t("or")}
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                {t("already-a-user")}
                <Link href={Path.LOGIN} color={"primary"}>
                  {" "}
                  {t("sign-in")}
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>


    </>
  );
}
