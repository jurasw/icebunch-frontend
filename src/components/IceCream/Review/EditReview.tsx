import { Box, Button, HStack, IconButton, Spacer, Textarea } from "@chakra-ui/react";
import { Review } from "../../../models/Review";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useReviews } from "../../../hooks/queries/useReviews";
import ReactStars from "react-stars";

interface Props {
  review: Review | undefined;
  userId: string | undefined;
}

function ReviewTile({ review, userId }: Props) {
  const { iceCreamId } = useParams();

  const { putMutation } = useReviews({
    iceCreamId: iceCreamId!,
  });

  const [editing, setEditing] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
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
  };

  return (
    <>
      {editing ? (
        <>
          <ReactStars onChange={setReviewRating} size={30} color2={"#ffd700"} />
          <Textarea
            onChange={handleFieldContent}
            resize={"none"}
            placeholder="Share your thoughts about this one"
          />
          <Button
            _hover={{
              cursor: "pointer",
            }}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            as={"a"}
            onClick={sendReview}
            variant="primaryButton"
            isLoading={putMutation.isLoading}
          >
            Add review
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
          <Box>
            {review?.username}
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
          />
        </HStack>
      )}
    </>
  );
}

export default ReviewTile;
