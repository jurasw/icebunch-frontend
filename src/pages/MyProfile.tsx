import { Center, Text, Button, Avatar, VStack } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { IceCream } from "../models/IceCream";
import { useAuthStore } from "../zustand";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { Path } from "./Paths";

const MyProfile = () => {
  const navigate = useNavigate()
  //   const [iceCream, setIceCream] = useState<IceCream[]>([]);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Nav />
      <Center margin={8}>
        <VStack spacing={8}>
        <Text fontSize={"4xl"} as="b">
          Welcome {user?.email}
        </Text>
      <Avatar
                      as={"a"}
                      size={"2xl"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
        <Button
        onClick={() => {navigate(Path.SETTINGS)}}
        
        >
            Settings
        </Button>
        </VStack>
      </Center>
    </>
  );
};

export default MyProfile;
