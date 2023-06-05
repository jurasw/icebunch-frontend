import { Image } from "@chakra-ui/react";
import { Language, useLanguageStore } from "../../zustand";
import { useTranslation } from 'react-i18next';

interface Props {
  src: string;
  locale: Language;
}

function Flag(props: Props) {
  const { i18n } = useTranslation();
  const changeLanguage = useLanguageStore((state) => state.changeLanguage);

  return (
    <Image
      onClick={() => {
        changeLanguage(props.locale);
        i18n.changeLanguage(props.locale);
        console.log(props.locale)
      }}
      _hover={{ cursor: "pointer" }}
      src={props.src}
      roundedTop="lg"
      objectFit="contain"
      height="30px"
      width="auto"
      mx={5}
    />
  );
}

export default Flag;
