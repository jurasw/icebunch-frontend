import { Box, Container, Text, Button, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Path } from "../../pages/Paths";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
          {t('welcome-to')}<br />
          {t('the-ice-cream-world')}
        </Text>
        <Text fontSize='xl' color={"gray.500"}>
          {t('hero-first')}
        </Text>
        <Stack
          direction={"column"}
          spacing={3}
          align={"center"}
          alignSelf={"center"}
          position={"relative"}
        >
          <Button 
             onClick={() => {
              navigate(Path.HOME);
            }} variant="primaryButton">{t('show-me')}</Button>
          <Button onClick={()=> {window.scrollTo(600, 600);}} variant={"link"} colorScheme={"blue"} size={"sm"}>
            {t('read-more')}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
