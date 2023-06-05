import {
  Button,
  HStack,
  IconButton,
  Spacer,
  Textarea,
  Text,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { Review } from "../../../models/Review";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../../zustand";
import { useReviews } from "../../../hooks/queries/useReviews";
import { Rate } from "antd";
import ReviewStars from "../ReviewStars";
import { useUser } from "../../../hooks/queries/useUser";
import { UserDB } from "../../../models/User";


interface Props {
  review: Review | undefined;
  userId: string | undefined;
}

function EditReview({ review, userId }: Props) {
  const { iceCreamId } = useParams();

  const { putMutation, deleteMutation } = useReviews({
    iceCreamId: iceCreamId!,
  });

  const { getUserFromEmail } = useUser();
  const [userData, setUserData] = useState<UserDB>();
  const user = useAuthStore((state) => state.user);

  const [editing, setEditing] = useState(false);
  const [reviewContent, setReviewContent] = useState(review!.content);
  const [reviewRating, setReviewRating] = useState<number>(0);

  const handleFieldContent = (event: any) => {
    setReviewContent(event.target.value);
  };

  const sendReview = () => {
    putMutation.mutate({
      rating: reviewRating,
      content: reviewContent,
      iceCreamId: iceCreamId!,
      userId: userId!,
      username: "test",
    });
    setEditing(false);
  };

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
      <Text
        fontSize={{ base: "16px", lg: "18px" }}
        color="primary"
        fontWeight={"500"}
        textTransform={"uppercase"}
        mb={"4"}
      >
        My Review
      </Text>
      {editing ? (
        <>
          <Rate
          allowHalf
          style={{ color: 'black', fontSize: '30px' }}
          defaultValue={review?.rating}
          onChange={setReviewRating}
          />
          <Textarea
            onChange={handleFieldContent}
            resize={"none"}
            placeholder="Share your thoughts about this one"
            value={reviewContent}
          />
          <Button
            _hover={{
              cursor: "pointer",
            }}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            onClick={sendReview}
            variant="primaryButton"
            isLoading={putMutation.isLoading}
          >
            Confirm my review
          </Button>
        </>
      ) : (
        <HStack
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          margin={"0.5em"}
          padding={"1em"}
          _hover={{ cursor: "pointer" }}
        >
          <Box fontWeight={"bold"}>
            <HStack mb={2}>
              <Avatar name={review?.username} src={userData?.avatarUrl} mr={4} />
              <>
                {review?.username}
                <Spacer />
                <ReviewStars rating={review?.rating} />
              </>
            </HStack>
            <p>{review?.content}</p>
          </Box>
          <Spacer />
          <IconButton
            aria-label="Search database"
            icon={<EditIcon />}
            onClick={() => setEditing(true)}
          />
          <IconButton
            ml={4}
            aria-label="Search database"
            icon={<DeleteIcon />}
            onClick={() =>
              deleteMutation.mutate({
                reviewId: review!._id,
              })
            }
          />
        </HStack>
      )}
    </>
  );
}

export default EditReview;
