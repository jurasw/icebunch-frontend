import { Center, Text } from "@chakra-ui/react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";


export default function ConfirmRequest(): JSX.Element {
  const { t } = useTranslation();

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
              {t('email-confirm')}
                </Text>
            </Center>
          </>
    </Flex>
  );
}
