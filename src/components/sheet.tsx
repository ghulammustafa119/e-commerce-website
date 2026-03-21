"use client"
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";

export function SheetSide() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="grid gap-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button className="md:hidden">{<AiOutlineMenu />}</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-3xl">Shop.co</SheetTitle>
          </SheetHeader>
          <nav>
            <ul className="grid grid-cols-1 p-6 my-3 text-2xl gap-y-4">
              <li>
                <Link href="/" onClick={handleLinkClick}>Home</Link>
              </li>
              <li>
                <Link href="/onsale" onClick={handleLinkClick}>Shop</Link>
              </li>
              <li>
                <Link href="/onsale?sale=true" onClick={handleLinkClick}>On Sale</Link>
              </li>
              <li>
                <Link href="/onsale?new=true" onClick={handleLinkClick}>New Arrivals</Link>
              </li>
              <li>
                <Link href="/brands" onClick={handleLinkClick}>Brands</Link>
              </li>
              <li>
                <Link href="/wishlist" onClick={handleLinkClick}>Wishlist</Link>
              </li>
              <li>
                <Link href="/orders" onClick={handleLinkClick}>My Orders</Link>
              </li>
              <li>
                <Link href="/contact" onClick={handleLinkClick}>Contact</Link>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
