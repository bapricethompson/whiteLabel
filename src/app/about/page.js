"use client";
import Image from "next/image";
import team from "../img/candleMaking.jpg";
import candle from "../img/candle.jpg";
import Button from "../components/Button";

export default function About() {
  return (
    <div>
      <div className="flex  flex-wrap justify-between items-center py-12 w-[90%] mx-auto">
        <div className="relative w-[90%] md:w-[30%] mx-auto aspect-[4/4]">
          <Image src={team} alt="Making candle" fill className="object-cover" />
        </div>
        <div className="w-[80%] text-center my-4 md:text-left mx-auto md:w-[50%]">
          <h2 className="text-4xl md:text-5xl py-4">About Us</h2>
          <p className="my-6">
            At [Your Business Name], we believe in quality, creativity, and
            connection. What began as a small passion project has grown into a
            trusted destination for handcrafted goods that bring joy and
            intention to everyday living.
          </p>
          <p className="my-6">
            Our mission is simple: to create products that are thoughtfully
            designed, responsibly made, and delivered with care. Whether you’re
            shopping for yourself or a loved one, we hope you find something
            that feels just right.
          </p>
          <p className="my-6">
            We’re proud to be a small business rooted in community,
            authenticity, and craftsmanship. Every item we offer is a reflection
            of the care and attention we put into our work—from concept to
            customer.
          </p>
        </div>
      </div>
      <div className="bg-background text-center md:text-left">
        <div className="flex flex-wrap-reverse justify-between items-center w-[80%] mx-auto py-6 ">
          <div className="w-[80%] md:w-[50%] mx-auto my-4">
            <h1 className="text-4xl md:text-5xl py-4">
              What Makes Us Different
            </h1>
            <p className="my-6">
              At [Your Business Name], we’re not just another online shop —
              we’re a small business with a big heart. Every product we offer is
              thoughtfully selected, responsibly crafted, and delivered with
              care. We prioritize quality over quantity, customer relationships
              over transactions, and timeless design over trends. Whether it’s a
              personal note in your order or our responsive customer support, we
              go the extra mile because we genuinely care about your experience.
            </p>
            <Button variant={"accent"}>Shop Now</Button>
          </div>
          <div className="relative w-[90%] md:w-[30%] mx-auto aspect-[4/4]">
            <Image
              src={candle}
              alt="Wax Candle"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
