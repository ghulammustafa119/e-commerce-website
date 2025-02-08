
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";


export interface IProduct {
  imageUrl: string;
  discountPercent: number;
  isNew: boolean;
  name: string;
  description: string;
  price: number;
  _id: string;
  rating:string
}


// export interface IProduct {
//     title: string;
//     price: string;
//     id: number;
//     rating: string;
//     old_price?: string;
//     img_url: string;
//     discount?:string;
//     quantity:number
//   }

//  export interface IProduct {
//   _id: string;
//   name: string;
//   description: string;
//   price: string;
//   oldPrice:string;
//   rating:string;
//   imageUrl: string;
//   discounPercent?:string;
// }


export  interface IReviews {
    name: string;
    feedback: string;
    rating: number;
    verified: boolean;
    date? :string
}



 export  interface ICart {
  quantity: number;
  imageurl : string;
  title : string;
  id : number;
  size : string;
  color : string;
  price : string;
}


  //  const query = ` *[_type=='product']{
  //  _id,
  //  name,
  //  description,
  //  price,
  //  "imageUrl" : image.asset->url,
  //  category,
  //  discountPercent,
  //  "isNew": new,
  //  colors,
  //  sizes
  //  }`

  //  export const getProduct = async ()=>{
     
  //     const data = await client.fetch(query)
     
  //     return data
  //  }