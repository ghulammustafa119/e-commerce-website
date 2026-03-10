export interface IProduct {
  imageUrl: string;
  discountPercent: number;
  isNew: boolean;
  name: string;
  description: string;
  price: number;
  _id: string;
  rating: string;
  avgRating: number | null;
  reviewCount: number;
}

export interface IReviews {
  name: string;
  feedback: string;
  rating: number;
  verified: boolean;
  date?: string;
}

export interface ICart {
  quantity: number;
  imageUrl: string;
  title: string;
  id: number;
  size: string;
  color: string;
  price: string;
}
