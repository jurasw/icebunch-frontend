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
  IconButton,
  Input,
  HStack,
  FormControl,
  ModalFooter,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import { useAuthStore } from "../zustand";
import Nav from "../components/Nav/Nav";
import { useUser } from "../hooks/queries/useUser";
import { SetStateAction, useEffect, useState } from "react";
import { UserDB } from "../models/User";
import AvatarUpload from "../components/Profile/AvatarUpload";
import ReviewsMyProfile from "../components/Profile/ReviewsMyProfile";
import { EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Path } from "./Paths";

const MyProfile = () => {
  const user = useAuthStore((state) => state.user);
  const { getUserFromEmail, changeUserUsername } = useUser();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDB>();
  const [username, setUsername] = useState("");
  const [changedUsername, setChangedUsername] = useState("");
  const [usernameModal, setUsernameModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (!user) {
      navigate(Path.LOGIN);
    }

    const fetchUserData = async () => {
      if (user) {
        const result = await getUserFromEmail(user.email);
        setUserData(result);
        setUsername(result.username);
        setChangedUsername(result.username);
      }
    };
    fetchUserData();
  }, []);

  const handleUsername = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUsername(event.target.value);
  };

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
              as={IconButton}
              size="lg"
              rounded="full"
              top="-10px"
              bg="primary"
              aria-label="remove Image"
              icon={<EditIcon />}
              onClick={onOpen}
            />
          </Avatar>
          {userData?.username && (
            <HStack>
              <Text fontSize={"20px"} fontWeight={600}>
                {changedUsername}
              </Text>
              <IconButton
                size="sm"
                icon={<EditIcon />}
                aria-label=""
                onClick={() => setUsernameModal(true)}
              />
            </HStack>
          )}
          <Text fontSize="xl" as="b">
            My Reviews:{" "}
          </Text>
          <ReviewsMyProfile />
        </VStack>
      </Center>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AvatarUpload userId={userData?._id} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={usernameModal} onClose={() => setUsernameModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit username</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={username}
                onChange={handleUsername}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                changeUserUsername({
                  userId: userData!._id,
                  newUsername: username,
                });
                setChangedUsername(username);
                setUsernameModal(false);
              }}
            >
              Save
            </Button>
            <Button onClick={() => setUsernameModal(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyProfile;
