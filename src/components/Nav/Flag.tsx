import { Image } from "@chakra-ui/react";
import { Language, useLanguageStore } from "../../zustand";

interface Props {
  src: string;
  locale: Language;
}

function Flag(props: Props) {
  const changeLanguage = useLanguageStore((state) => state.changeLanguage);

  return (
    <Image
      onClick={() => {
        changeLanguage(props.locale);
      }}
      _hover={{ cursor: "pointer" }}
      src={props.src}
      roundedTop="lg"
      objectFit="contain"
      height="30px"
      width="100%"
      mx={5}
    />
  );
}

export default Flag;
