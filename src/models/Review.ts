export interface Review {
  _id: string;
  userId: string;
  username: string;
  iceCreamId: string;
  content: string;
  rating: number;
}

export interface SendReviewDto {
  rating: number;
  content: string;
  iceCreamId: string;
  userId: string;
  username: string;
}

export interface DeleteReviewDto {
  iceCreamId: string;
  userId: string;
}
