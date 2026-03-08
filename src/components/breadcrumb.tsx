"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeLabels: Record<string, string> = {
  products: "Products",
  onsale: "On Sale",
  arrivals: "Cart",
  checkout: "Checkout",
  brands: "Brands",
  wishlist: "Wishlist",
  orders: "Orders",
  "track-order": "Track Order",
};

export function BreadcrumbDemo() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <div className="px-3 md:mt-6 md:ml-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const isLast = index === segments.length - 1;
            const label = routeLabels[segment] || decodeURIComponent(segment).replace(/-/g, " ");

            return (
              <span key={href} className="contents">
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="capitalize">{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href} className="capitalize">
                      {label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
