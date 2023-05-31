export interface Review {
    _id: string;
    userId: string;
    username: string;
    iceCreamId: string;
    content: string;
    rating: number;
  }

  export interface SendReviewDTO {
    rating: number;
    content: string;
  }

  