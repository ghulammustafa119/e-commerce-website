import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import React from 'react'

function PaginationPage() {
  return (
    <div className="w-full mt-10">
 <Pagination>
  <PaginationContent className="w-full space-x-4 flex justify-center lg:ml-7">
    <PaginationItem>
      <PaginationPrevious href="/" />
    </PaginationItem>

    <PaginationItem className="hidden lg:block">
      <PaginationLink href="/">Home</PaginationLink>
    </PaginationItem>
    <PaginationItem className="hidden lg:block">
      <PaginationEllipsis />
    </PaginationItem>

    <PaginationItem className="hidden lg:block">
      <PaginationLink href="/sell">arrivals</PaginationLink>
    </PaginationItem>
    <PaginationItem className="hidden lg:block">
      <PaginationEllipsis />
    </PaginationItem>

    <PaginationItem>
      <PaginationLink href="/brand">Brands</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>

    <PaginationItem>
      <PaginationNext href="/onsale" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
 
    </div>
  )
}

export default PaginationPage  