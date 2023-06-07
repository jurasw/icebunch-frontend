import { Center, Text, Button, Avatar, VStack } from "@chakra-ui/react";
import { useAuthStore } from "../zustand";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { Path } from "./Paths";
import { useUser } from "../hooks/queries/useUser";
import { useEffect, useState } from "react";
import { UserDB } from "../models/User";
import { useTranslation } from "react-i18next";

const MyProfile = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const { getUserFromEmail } = useUser();

  const [userData, setUserData] = useState<UserDB>();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const result = await getUserFromEmail(user.email);
        setUserData(result);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Nav />
      <Center margin={8}>
        <VStack spacing={8}>
          <Text fontSize={"4xl"} as="b">
            {t('welcome')} {user?.email}
          </Text>
          <Avatar as={"a"} size={"2xl"} src={userData?.avatarUrl} />
          <Button
            onClick={() => {
              navigate(Path.SETTINGS);
            }}
          >
            {t('settings')}
          </Button>
        </VStack>
        
      </Center>
    </>
  );
};

export default MyProfile;
