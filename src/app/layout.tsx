import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { CartProvider } from "@/components/cart-context";
import { WishlistProvider } from "@/components/wishlist-context";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop.co - Find Clothes That Match Your Style",
  description: "Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // @ts-expect-error Clerk async server component
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
          <WishlistProvider>
            <Toaster position="top-right" richColors />
            <div className="max-w-[95%] mx-auto">
              <Header />
              {children}
              <Footer />
            </div>
          </WishlistProvider>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
