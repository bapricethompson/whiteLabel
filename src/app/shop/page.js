"use client";

import Slider from "../components/Slider";
import ClearButton from "../components/ClearButton";
import FilterButton from "../components/FilterButton";
import ListingCard from "../components/ListingCard";
import GenericH1 from "../components/GenericH1";
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
          <GenericH1 className="text-center">Find Your Favorites</GenericH1>
          <div className="my-12">
            <Slider></Slider>
          </div>
        </div>

        <div className="w-[80%] flex justify-between mx-auto py-12">
          <ClearButton></ClearButton>
          <FilterButton></FilterButton>
        </div>
        <div className="w-[90%] max-w-[1400px] py-8  grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))] gap-6 mx-auto">
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
