import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function BreadcrumbDemo() {
  return (
    <div className="px-3 md:mt-6 md:ml-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-4">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">SHOP</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
              <DropdownMenuItem>CHECKERED SHIRT</DropdownMenuItem>
              <DropdownMenuItem>SLEEVE STRIPED T-SHIRT</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Men</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
          <BreadcrumbPage>T-shirts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}






// import Link from "next/link"

// import {
//   Breadcrumb,
//   BreadcrumbEllipsis,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"

// export function BreadcrumbDemo() {
//   return (
//    <div className="max-w-screen-2xl  mx-auto">
    
//     <Breadcrumb className="mt-4 ml-4 sm:ml-10  ">
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="/">Home</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbItem>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="/casual">Shop</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//           <BreadcrumbPage>Mens</BreadcrumbPage>
//         </BreadcrumbItem>
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href="/">casual</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />
//         <BreadcrumbItem>
//         </BreadcrumbItem>
//       </BreadcrumbList>
//     </Breadcrumb>

//    </div>
//   )
// }