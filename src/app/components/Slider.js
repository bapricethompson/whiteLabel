import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import team from "../img/candleMaking.jpg";
import candle from "../img/candle.jpg";

export default function Slider() {
  const [sliderRef] = useKeenSlider(
    {
      slides: { perView: 3, spacing: 15 },
      loop: true,
      duration: 1000,
      drag: true,
      breakpoints: {
        "(max-width: 640px)": {
          slides: { perView: 1, spacing: 12 },
        },
      },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div ref={sliderRef} className="keen-slider w-full mx-auto">
        {[team, candle, team].map((imgSrc, idx) => (
          <div
            key={idx}
            className="keen-slider__slide"
            style={{ position: "relative", height: "300px", width: "100%" }} // changed width to 100% for better responsiveness
          >
            <Image
              src={imgSrc}
              alt="Slide Image"
              layout="fill"
              objectFit="cover"
              className="rounded"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
