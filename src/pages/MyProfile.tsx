import { Center, Text, Button, Avatar, VStack } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { IceCream } from "../models/IceCream";
import { useAuthStore } from "../zustand";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { Path } from "./Paths";
import { useUser } from "../hooks/queries/useUser";
import { useEffect, useState } from "react";

const MyProfile = () => {
  const navigate = useNavigate()
  //   const [iceCream, setIceCream] = useState<IceCream[]>([]);
  const [avatarUrl, setAvatarUrl] = useState('')
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (user) {
      const { getUserAvatarFromEmail } = useUser();
      const result = await getUserAvatarFromEmail(user.email)
      setAvatarUrl(result);
    }
    };
    fetchAvatar();
  }, []);

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
                      src={avatarUrl
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
