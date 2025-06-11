import Image from "next/image";
import bee from "./img/waxCandle.jpg";
import candle from "./img/candle.jpg";
import serums from "./img/serums.jpg";
import soaps from "./img/soaps.jpg";
import team from "./img/candleMaking.jpg";
import Button from "./components/Button";

export default function Home() {
  return (
    <div className="my-12 mx-10 text-primaryText">
      <div className="bg-background">
        <div className="flex justify-between items-center w-[80%] mx-auto py-6 ">
          <div className="w-[50%] mx-auto">
            <h1 className="text-7xl">Hand-Made with Care</h1>
            <Button variant={"accent"}>Shop Now</Button>
          </div>
          <div className="relative w-[30%] mx-auto aspect-[3/4]">
            <Image
              src={candle}
              alt="Wax Candle"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between py-12 w-[80%] mx-auto">
        <div className="w-[30%] mx-auto aspect-[3/3]">
          <div className="relative w-full h-full">
            <Image src={bee} alt="Wax Candle" fill className="object-cover" />
          </div>
          <h2 className="text-center mt-4 text-xl">Best-Sellers</h2>
        </div>
        <div className="w-[30%] mx-auto aspect-[3/3]">
          <div className="relative w-full h-full">
            <Image src={serums} alt="Serums" fill className="object-cover" />
          </div>
          <h2 className="text-center mt-4 text-xl">New Arrivals</h2>
        </div>
        <div className="w-[30%] mx-auto aspect-[3/3]">
          <div className="relative w-full h-full">
            <Image src={soaps} alt="Soaps" fill className="object-cover" />
          </div>
          <h2 className="text-center mt-4 text-xl">Curated Picks</h2>
        </div>
      </div>

      <div className="flex justify-between items-center py-12 w-[90%] mx-auto">
        <div className="relative w-[30%] mx-auto aspect-[3/4]">
          <Image src={team} alt="Making candle" fill className="object-cover" />
        </div>
        <div className="w-[50%]">
          <h2 className="text-5xl py-4">Our Story</h2>
          <p>generic text here</p>
        </div>
      </div>
      <div>
        <h3>Socials</h3>
      </div>
    </div>
  );
}
