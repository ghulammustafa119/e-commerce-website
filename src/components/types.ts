export interface IProduct {
    title: string;
    price: string;
    id: number;
    rating?: string;
    old_price?: string;
    img_url: string;
    discount?:string;
  }


export  interface IReviews {
    name: string;
    feedback: string;
    rating: number;
    verified: boolean;
}