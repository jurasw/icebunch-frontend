import { Image } from "@chakra-ui/react"
// import { useState } from "react";


interface Props {
    src : string;
    locale: string;
}

function Flag (props: Props) {

    // const [appLanguage, setAppLanguage] = useState('')

    return (
        <Image
        // onClick={() => {setAppLanguage(props.locale)}}
        _hover={{cursor: "pointer"}}
        src={props.src}
        roundedTop="lg"
        objectFit="contain"
        height="30px"
        width="100%"
        />
    )
}

export default Flag

