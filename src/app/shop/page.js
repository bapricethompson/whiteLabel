"use client";

import Slider from "../components/Slider";
import ClearButton from "../components/ClearButton";
import FilterButton from "../components/FilterButton";
import ListingCard from "../components/ListingCard";
import GenericOuterDiv from "../components/GenericOuterDiv";
import { FetchItems } from "../modules/FetchItems";
import { useEffect, useState } from "react";

export default function Shop() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await FetchItems();
        setItems(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    loadEvents();
  }, []);
  return (
    <div>
      <GenericOuterDiv>
        <div className="bg-borders py-12">
          <h1 className="text-4xl sm:text-5xl text-center md:text-6xl mb-8 ">
            Find Your Favorites
          </h1>
          <div className="my-12">
            <Slider></Slider>
          </div>
        </div>

        <div className="w-[80%] flex justify-between mx-auto py-12">
          <ClearButton></ClearButton>
          <FilterButton></FilterButton>
        </div>
        <div className="w-[80%] flex flex-wrap gap-6 justify-start mx-auto pb-12">
          {items.map((item) => (
            <div
              key={item.itemId}
              className="min-w-[300px] flex-1 max-w-[450px]"
            >
              <a href={`./singleItem?itemId=${item.itemId}`}>
                <ListingCard
                  imgUrl={item.imgUrl}
                  infoTitle={item.title}
                  price={item.price}
                />
              </a>
            </div>
          ))}
        </div>
      </GenericOuterDiv>
    </div>
  );
}
