export interface Review {
  _id: string;
  rating: number;
  content: string;
  iceCreamId: string;
  userId: string;
  username: string;
  lastUpdate: Date;
}

export interface CreateReviewDto {
  rating: number;
  content: string;
  iceCreamId: string;
  userId: string;
  username: string;
  lastUpdate: Date;
}

export interface UpdateReviewDto {
  reviewId: String;
  body: {
  rating: number;
  content: string;
  iceCreamId: string;
  userId: string;
  lastUpdate: Date;}
}


export interface DeleteReviewDto {
  reviewId: string;
}
