"use client";
import Image from "next/image";
import team from "../../img/candleMaking.jpg";
import candle from "../../img/candle.jpg";
import Button from "../../components/Button";
import GenericP from "../../components/GenericP";
import SmallerH1 from "../../components/SmallerH1";

export default function About() {
  return (
    <div>
      <div className="bg-borders">
        <div className="flex  flex-wrap bg-borders justify-between items-center py-12 w-[90%] mx-auto">
          <div className="relative w-[90%] md:w-[30%] mx-auto  aspect-[4/4]">
            <Image
              src={team}
              alt="Making candle"
              fill
              className="object-cover rounded "
            />
          </div>
          <div className="w-[80%] text-center my-4 md:text-left mx-auto md:w-[50%]">
            <SmallerH1>About Us</SmallerH1>
            <GenericP>
              At [Your Business Name], we believe in quality, creativity, and
              connection. What began as a small passion project has grown into a
              trusted destination for handcrafted goods that bring joy and
              intention to everyday living.
            </GenericP>
            <GenericP>
              Our mission is simple: to create products that are thoughtfully
              designed, responsibly made, and delivered with care. Whether
              you’re shopping for yourself or a loved one, we hope you find
              something that feels just right.
            </GenericP>
            <GenericP>
              We’re proud to be a small business rooted in community,
              authenticity, and craftsmanship. Every item we offer is a
              reflection of the care and attention we put into our work—from
              concept to customer.
            </GenericP>
          </div>
        </div>
      </div>

      <div className="bg-background text-center py-12 md:text-left">
        <div className="flex flex-wrap-reverse justify-between items-center w-[80%] mx-auto py-6 ">
          <div className="w-[80%] md:w-[50%] mx-auto my-4">
            <SmallerH1>What Makes Us Different</SmallerH1>
            <GenericP>
              At [Your Business Name], we’re not just another online shop —
              we’re a small business with a big heart. Every product we offer is
              thoughtfully selected, responsibly crafted, and delivered with
              care. We prioritize quality over quantity, customer relationships
              over transactions, and timeless design over trends. Whether it’s a
              personal note in your order or our responsive customer support, we
              go the extra mile because we genuinely care about your experience.
            </GenericP>
            <Button href="/shop" variant={"accent"}>
              Shop Now
            </Button>
          </div>
          <div className="relative w-[90%] md:w-[30%] mx-auto aspect-[4/4]">
            <Image
              src={candle}
              alt="Wax Candle"
              fill
              className="object-cover rounded "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
