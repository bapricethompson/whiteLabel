import Link from "next/link";
import Image from "next/image";
import bee from "../img/waxCandle.jpg";
import serums from "../img/serums.jpg";
import soaps from "../img/soaps.jpg";

export default function Featured() {
  return (
    <div className="flex flex-wrap justify-between py-12 w-[80%] mx-auto">
      {[
        {
          href: "/shop?filter=Best-Seller",
          image: bee,
          alt: "Wax Candle",
          label: "Best-Sellers",
        },
        {
          href: "/shop?filter=New",
          image: serums,
          alt: "Serums",
          label: "New Arrivals",
        },
        {
          href: "/shop?filter=Popular",
          image: soaps,
          alt: "Soaps",
          label: "Curated Picks",
        },
      ].map(({ href, image, alt, label }) => (
        <Link
          key={label}
          href={href}
          className="group w-[95%] md:w-[30%] my-4 mx-auto aspect-[3/3] block transition-transform hover:scale-105 my-8"
        >
          <div className="relative w-full h-full rounded overflow-hidden shadow-md">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-80"
            />
          </div>
          <h2 className="text-center mt-4 text-xl group-hover:text-accent group-hover:font-semibold transition-colors">
            {label}
          </h2>
        </Link>
      ))}
    </div>
  );
}
