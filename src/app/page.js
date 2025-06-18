import Image from "next/image";
import team from "../img/candleMaking.jpg";
import Button from "../components/Button";
import Featured from "../components/Featured";
import GenericH1 from "../components/GenericH1";
import GenericP from "../components/GenericP";

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
    <div className="text-primaryText">
      <div className="bg-borders">
        <div className="flex flex-wrap-reverse justify-between text-center md:text-left items-center w-[80%] mx-auto py-6 ">
          <div className="w-[90%] md:w-[40%] mx-auto">
            <GenericH1>Hand-Made with Care</GenericH1>
            <h2 className="text-base  mb-8 ">
              Thoughtfully hand-crafted from start to finish, our products
              embody dedication, care, and a personal touch that you can feel.
            </h2>
            <Button href="/shop" variant={"accent"}>
              Shop Now
            </Button>
          </div>
          <div className="relative w-[95%] md:w-[30%] mx-auto aspect-[3/4]">
            <Image
              src={team}
              alt="Wax Candle"
              fill
              className="object-cover rounded "
              unoptimized
            />
          </div>
        </div>
      </div>
      <Featured />
      <div className="bg-pink">
        <div className="flex flex-wrap justify-between items-center py-12 w-[80%] mx-auto">
          <div className="relative w-[95%] md:w-[30%] mx-auto aspect-[3/4]">
            <Image
              src={team}
              alt="Making candle"
              fill
              className="object-cover rounded "
              unoptimized
            />
          </div>
          <div className="w-[90%] text-center md:text-left mx-auto md:w-[50%]">
            <h2 className="text-3xl md:text-5xl py-4">Our Story</h2>
            <GenericP>
              What started as a few late nights, big dreams, and a passion for
              quality quickly grew into something bigger than we imagined. Our
              journey began with the belief that beautiful, well-made products
              should feel personal — not mass-produced. We wanted to create a
              space where thoughtful design meets real intention, where every
              item has a purpose, and every customer is treated like a friend.
            </GenericP>
            <GenericP>
              We’re a small but mighty team — creatives, makers, and
              problem-solvers — who believe that the details matter. From
              hand-packing your orders to answering your questions with care,
              we’re involved every step of the way. We built this business from
              the ground up, fueled by community support and a desire to bring a
              little more meaning into the everyday.
            </GenericP>
            <GenericP>
              This is more than a shop. It’s a reflection of who we are and what
              we value: simplicity, connection, and doing things the right way —
              even when it takes longer. Thanks for being part of the story.
            </GenericP>
          </div>
        </div>
      </div>

      <div>
        <div className="max-w-5xl py-12 mx-auto">
          <h2 className="text-3xl md:text-5xl  text-primaryText text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid gap-10 md:grid-cols-3 px-4 md:px-0 max-w-7xl mx-auto">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-background border border-borders rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between min-h-[280px]"
              >
                <p className="text-primaryText text-lg leading-relaxed mb-6 italic flex-grow">
                  “{t.quote}”
                </p>
                <p className="text-right text-base font-semibold text-secondaryText">
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
          <div className="my-12 text-center">
            <Button href="/shop" variant={"accent"}>
              View Items
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
