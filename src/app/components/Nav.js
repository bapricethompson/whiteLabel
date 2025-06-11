"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sm:px-2 md:p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 text-primaryText">
      {/* Left Section */}
      <div className="w-full md:w-2/5 2xl:w-[25%] flex items-center justify-between md:justify-start">
        <a href="/" className="mr-[30px]">
          <span
            className="material-icons"
            style={{
              fontSize: "40px",
              marginRight: "30px",
              marginLeft: "15px",
            }}
          >
            travel_explore
          </span>
        </a>
        <div className="space-x-6 hidden md:block">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
      <div className="mr-0">
        <a href="/cart" className="mr-[30px]">
          <span
            className="material-icons"
            style={{
              fontSize: "40px",
              marginRight: "30px",
              marginLeft: "15px",
            }}
          >
            shopping_cart
          </span>
        </a>
      </div>
    </nav>
  );
}
