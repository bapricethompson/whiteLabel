import Image from "next/image";
import bee from "./img/waxCandle.jpg";
//import candle from "./img/candle.jpg";
import serums from "./img/serums.jpg";
import soaps from "./img/soaps.jpg";
import team from "./img/candleMaking.jpg";
import Button from "./components/Button";

export default function Home() {
  const testimonials = [
    {
      quote:
        "Everything about my order was perfect — the packaging, the quality, and even the handwritten thank-you note. You can tell they really care.",
      name: "Hannah R.",
    },
    {
      quote:
        "I’ve bought from a lot of online shops, but this one is special. The product felt so personal and well made. I’ll definitely be back!",
      name: "Marcus L.",
    },
    {
      quote:
        "Customer service was incredible — they responded to my question within hours and helped me choose the right gift. Five stars all around.",
      name: "Jenna K.",
    },
  ];
  return (
    <div className="my-12 mx-10 text-primaryText">
      <div className="bg-background">
        <div className="flex flex-wrap-reverse justify-between text-center md:text-left items-center w-[80%] mx-auto py-6 ">
          <div className="w-[90%] md:w-[50%] mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-8 md:my-0">
              Hand-Made with Care
            </h1>
            <Button variant={"accent"}>Shop Now</Button>
          </div>
          <div className="relative w-[95%] md:w-[30%] mx-auto aspect-[3/4]">
            <Image src={team} alt="Wax Candle" fill className="object-cover" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between py-12 w-[80%] mx-auto">
        <div className="w-[95%] md:w-[30%] my-4 mx-auto aspect-[3/3]">
          <div className="relative w-full h-full">
            <Image src={bee} alt="Wax Candle" fill className="object-cover" />
          </div>
          <h2 className="text-center mt-4 text-xl">Best-Sellers</h2>
        </div>
        <div className="w-[95%] md:w-[30%] my-4 mx-auto aspect-[3/3]">
          <div className="relative w-full h-full">
            <Image src={serums} alt="Serums" fill className="object-cover" />
          </div>
          <h2 className="text-center mt-4 text-xl">New Arrivals</h2>
        </div>
        <div className="w-[95%] md:w-[30%] my-4 mx-auto aspect-[3/3]">
          <div className="relative w-full h-full">
            <Image src={soaps} alt="Soaps" fill className="object-cover" />
          </div>
          <h2 className="text-center mt-4 text-xl">Curated Picks</h2>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center py-12 w-[80%] mx-auto">
        <div className="relative w-[95%] md:w-[30%] mx-auto aspect-[3/4]">
          <Image src={team} alt="Making candle" fill className="object-cover" />
        </div>
        <div className="w-[90%] text-center md:text-left mx-auto md:w-[50%]">
          <h2 className="text-3xl md:text-5xl py-4">Our Story</h2>
          <p>generic text here</p>
        </div>
      </div>
      <div>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl  text-[#333333] text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white border border-[#DDD6CE] rounded-lg p-6 shadow-sm"
              >
                <p className="text-[#333333] text-base leading-relaxed mb-4 italic">
                  “{t.quote}”
                </p>
                <p className="text-right text-sm font-medium text-[#7D7D7D]">
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
