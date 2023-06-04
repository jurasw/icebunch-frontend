import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface Props {
  rating: number | undefined;
}

function ReviewStars({ rating }: Props) {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, i) => {
          if (rating) {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
          }
        })}
    </>
  );
}

export default ReviewStars;
