"use client"

import { BreadcrumbDemo } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Delete, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ICartItem {
  imageUrl: string;
  title: string;
  id: number;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

const initialCart: ICartItem[] = [
  {
    imageUrl: "/images/pro1.png",
    title: "Gradient Graphic T-shirt",
    id: 1,
    size: "Large",
    color: "White",
    price: 120,
    quantity: 1,
  },
  {
    imageUrl: "/images/pro2.png",
    title: "Gradient Graphic T-shirt",
    id: 2,
    size: "Large",
    color: "White",
    price: 120,
    quantity: 1,
  },
  {
    imageUrl: "/images/pro3.png",
    title: "Gradient Graphic T-shirt",
    id: 3,
    size: "Large",
    color: "White",
    price: 120,
    quantity: 1,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<ICartItem[]>(initialCart);
  const [promoCode, setPromoCode] = useState("");

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = promoCode === "SAVE10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <>
      <div className="pl-5">
        <BreadcrumbDemo />
        <h1 className="text-2xl font-bold mt-2">Your cart</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-start gap-3 mt-6">
        {/* Left Section */}
        <div className="w-full h-full md:w-[700px] md:h-[500px] border rounded-[20px]">
          {cartItems.map((item) => (
            <div className="flex justify-between mt-4 p-4 border-b" key={item.id}>
              <div className="flex gap-3">
                <Image src={item.imageUrl} alt={item.title} className="rounded-[16px]" width={100} height={100} />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm">Size: {item.size}</p>
                  <p className="text-sm">Color: {item.color}</p>
                  <p className="font-bold">${item.price * item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col justify-between items-center space-y-5">
                <button type="button" aria-label={`Remove ${item.title}`} onClick={() => handleRemoveItem(item.id)}>
                  <Delete className="cursor-pointer" />
                </button>
                <div className="w-[100px] h-[40px] flex justify-between p-3 items-center rounded-[62px] bg-[#F0F0F0] text-gray-400">
                  <button type="button" aria-label="Decrease quantity" onClick={() => handleQuantityChange(item.id, -1)}>
                    <Minus className="cursor-pointer" />
                  </button>
                  {item.quantity}
                  <button type="button" aria-label="Increase quantity" onClick={() => handleQuantityChange(item.id, 1)}>
                    <Plus className="cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[400px] h-full md:h-[450px] border rounded-[20px] flex flex-col justify-start items-center p-4">
          <div className="w-[90%] space-y-2">
            <h1 className="text-xl font-bold">Order Summary</h1>
            <p className="flex justify-between">Subtotal <span>${subtotal.toFixed(2)}</span></p>
            <p className="flex justify-between">Discount <span>${discount.toFixed(2)}</span></p>
            <p className="flex justify-between font-bold">Total <span>${total.toFixed(2)}</span></p>
            <div className="flex">
              <label htmlFor="promo-code" className="sr-only">Promo code</label>
              <input
                id="promo-code"
                className="bg-[#F0F0F0] w-[200px] md:w-full py-2 px-5 rounded-[16px] text-gray-600 outline-none"
                placeholder="Add promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button className="ml-1">Apply</Button>
            </div>
            <Button className="w-full">Go To Checkout</Button>
          </div>
        </div>
      </div>
    </>
  );
}
