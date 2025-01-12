"use client"
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
import { NavigationMenuDemo } from "./navigation-menu";

const SHEET_SIDES = ["left"] as const

type SheetSide = (typeof SHEET_SIDES)[number]

export function SheetSide() {
  return (
    <div className="grid gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button>{<AiOutlineMenu className="md:hidden" />}</Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="text-3xl">Shop.co</SheetTitle>
            </SheetHeader>
            <ul className="">
          <li className="grid grid-cols-1 p-6 my-3 text-2xl gap-y-4">
            <Link href={""}><NavigationMenuDemo/></Link>
            <Link href={""} className="ml-4"> On Sale</Link>
            <Link href={""} className="ml-4">New Arrivals</Link>
            <Link href={""} className="ml-4">Brands</Link>
          </li>
        </ul>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
