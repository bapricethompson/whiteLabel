"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="text-primaryText sm:px-2 md:p-4">
      {/* MOBILE NAV */}
      <div className="flex items-center justify-between md:hidden p-4">
        <a href="/" className="flex items-center">
          <span className="material-icons text-4xl ml-2">shopping_basket</span>
        </a>
        <button onClick={toggleMenu} className="mr-4">
          <span className="material-icons text-4xl">menu</span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-background border-y py-4 space-y-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="hover:underline"
          >
            Home
          </Link>
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="hover:underline"
          >
            Shop
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:underline"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="hover:underline"
          >
            Contact
          </Link>
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="hover:underline "
          >
            View Cart
          </Link>
        </div>
      )}

      {/* DESKTOP NAV */}
      <div className="hidden md:flex flex-row items-center justify-between">
        <div className="w-2/5 2xl:w-[25%] flex items-center">
          <a href="/" className="mr-[30px]">
            <span
              className="material-icons"
              style={{
                fontSize: "40px",
                marginRight: "30px",
                marginLeft: "15px",
              }}
            >
              shopping_basket
            </span>
          </a>
          <div className="space-x-6">
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
        <div className="mr-[30px]">
          <a href="/cart">
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
      </div>
    </nav>
  );
}
