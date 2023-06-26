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
  Editable,
  ButtonGroup,
  Input,
  Flex,
  EditablePreview,
  useEditableControls,
  EditableInput,
  HStack,
} from "@chakra-ui/react";
import { useAuthStore } from "../zustand";
import Nav from "../components/Nav/Nav";
import { useUser } from "../hooks/queries/useUser";
import { SetStateAction, useEffect, useState } from "react";
import { UserDB } from "../models/User";
import AvatarUpload from "../components/Profile/AvatarUpload";
import ReviewsMyProfile from "../components/Profile/ReviewsMyProfile";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Path } from "./Paths";

const MyProfile = () => {
  const user = useAuthStore((state) => state.user);
  const { getUserFromEmail, changeUserUsername } = useUser();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDB>();
  const [username, setUsername] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (!user) {
      navigate(Path.LOGIN);
    }

    const fetchUserData = async () => {
      if (user) {
        const result = await getUserFromEmail(user.email);
        setUserData(result);
      }
    };
    fetchUserData();
  }, []);

  const handleUsername = (newValue: SetStateAction<string>) => {
    setUsername(newValue);
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          aria-label=""
          {...getSubmitButtonProps()}
          onClick={() =>
            changeUserUsername({
              userId: userData!._id,
              newUsername: username,
            })
          }
        />
        <IconButton
          icon={<CloseIcon />}
          aria-label=""
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          size="sm"
          icon={<EditIcon />}
          aria-label=""
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

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
            <Editable
              value={username}
              onChange={handleUsername}
              textAlign="center"
              defaultValue={userData.username}
              fontSize="2xl"
              isPreviewFocusable={false}
            >
              <HStack>
                <EditablePreview />
                <Input as={EditableInput} />
                <EditableControls />
              </HStack>
            </Editable>
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
    </>
  );
};

export default MyProfile;
