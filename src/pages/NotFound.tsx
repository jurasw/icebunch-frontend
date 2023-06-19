import { Center, Text, Button, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Path } from "./Paths";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";

export default function NotFound() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    return (
        <>
        <Nav/>

        <Center padding={'2rem'}>
            <VStack spacing={'1.5rem'} >

            <Text align={'center'} fontSize='3xl'>{t('page-moved')}</Text>
            <Text align={'center'} fontSize='3xl' >{t('if-you-are-looking')}</Text>
            <Button
             onClick={() => {
              navigate(Path.ICE_CREAMS);
            }} variant="primaryButton">{t('show-me')}</Button>
            </VStack>

        </Center>
        </>
    )
}