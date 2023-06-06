import { Center, Text, VStack } from "@chakra-ui/react";
import Nav from "../components/Nav";
import { useTranslation } from "react-i18next";

const About = () => {

  const { t } = useTranslation();
  return (
    <>
      <Nav />
      <VStack padding={'3rem'}>

        <Text fontSize={"2xl"} as="b" >{t('message3')}</Text>
        <Text  as="b">
        {t('message1')}
        </Text>
        <Text>{t('message2')}</Text>
        <Text>{t('faq')}</Text>
        <Text>{t('faq1')}</Text>
        <Text>{t('ans1')}</Text>
        <Text>{t('faq2')}</Text>
        <Text>{t('ans2')}</Text>
        <Text>{t('faq3')}</Text>
        <Text>{t('ans3')}</Text>
      </VStack>

    </>
  );
};

export default About;