import { FetchSingleItem } from "../modules/FetchSingleItem";
import Sizes from "./Sizes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function GettingItem() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");
  const [item, setItems] = useState([]);

  useEffect(() => {
    async function loadItem() {
      try {
        const data = await FetchSingleItem(itemId);
        setItems(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    loadItem();
  }, []);
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-[90%] md:w-[80%] mx-auto py-8 md:py-12 gap-6 h-[80vh] ">
      <div className="relative w-full md:w-1/2 aspect-[4/3] rounded overflow-hidden">
        <Image
          src={item.imgUrl}
          alt={item.title || "Info image"}
          fill
          style={{ objectFit: "cover", borderRadius: "inherit" }}
        />
      </div>

      <div className="w-full md:w-1/2 px-4 md:px-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl">{item.title}</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl mt-2">{item.price}</h2>
        {item.sizes && <Sizes />}
        <p className="mt-4">{item.description}</p>
      </div>
    </div>
  );
}
