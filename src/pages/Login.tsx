import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";
import OAuthButtonGroup from "../components/Login/OAuthButtonGroup";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../zustand";
import { Path } from "./Paths";
import { Helmet } from "react-helmet";
export default function SimpleCard() {
  const navigate = useNavigate();
  const { formLoginMutation } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);

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

  const login = () => {
    formLoginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate(`/`);
        },
        onError: (err: unknown) => {
          console.log(err);
        },
      }
    );
    setPassword("");
  };

  return (
    <>
    <Helmet>
        <title>{t('sign-in')}</title>
        <meta name="description" content='Login to the iceBunch' />
    </Helmet>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>{t("login-header")}</Heading>
            <Text color="muted">
              {t("dont-have-account")}{" "}
              <Button
                as={"a"}
                href={"/register"}
                variant="link"
                colorScheme="blue"
              >
                {t("sign-up")}
              </Button>
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>{t("email-adress")}</FormLabel>
                <Input type="email" onChange={handleEmail} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>{t("password")}</FormLabel>
                <Input type="password" onChange={handlePassword} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"primary"} href={"/forgot-password"}>
                    {" "}
                    {t("forgot-password")}
                  </Link>
                </Stack>
                <Button variant={"primaryButton"} onClick={login}>
                  {t("sign-in")}
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
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
