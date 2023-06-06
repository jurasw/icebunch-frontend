export interface Review {
  _id: string;
  rating: number;
  content: string;
  iceCreamId: string;
  userId: string;
  username: string;
  lastUpdate: Date;
}

export interface SendReviewDto {
  rating: number;
  content: string;
  iceCreamId: string;
  userId: string;
  username: string;
  lastUpdate: Date;
}

export interface DeleteReviewDto {
  reviewId: string;
}
