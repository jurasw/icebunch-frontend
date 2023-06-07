import {
  Center,
  Text,
  Avatar,
  VStack,
  AvatarBadge,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuthStore } from "../zustand";
import Nav from "../components/Nav";
import { useUser } from "../hooks/queries/useUser";
import { useEffect, useState } from "react";
import { UserDB } from "../models/User";
import AvatarUpload from "../components/Profile/AvatarUpload";
import ReviewsMyProfile from "../components/Profile/ReviewsMyProfile";

const MyProfile = () => {
  const user = useAuthStore((state) => state.user);
  const { getUserFromEmail } = useUser();

  const [userData, setUserData] = useState<UserDB>();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {user?.email}
          </Text>
          <Avatar size="2xl" src={userData?.avatarUrl}>
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
              onClick={onOpen}
            />
          </Avatar>
          <ReviewsMyProfile />
        </VStack>
      </Center>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AvatarUpload userId={userData?._id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyProfile;
