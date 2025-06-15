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
    <div className="flex justify-between items-center flex-wrap-reverse w-[80%] mx-auto py-12">
      <div className="relative w-[50%] aspect-[4/3] mx-auto mb-6 rounded overflow-hidden">
        <Image
          src={item.imgUrl}
          alt={item.title || "Info image"}
          fill
          style={{ objectFit: "cover", borderRadius: "inherit" }}
        />
      </div>
      <div className="w-[50%] px-12">
        <h1 className="text-4xl sm:text-5xl">{item.title}</h1>
        <h2 className="text-4xl sm:text-5xl">{item.price}</h2>
        {item.sizes && <Sizes></Sizes>}
        <p>{item.description}</p>
      </div>
    </div>
  );
}
