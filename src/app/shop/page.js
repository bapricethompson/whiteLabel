"use client";

import { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import FilterBar from "../../components/FilterBar";
import ListingCard from "../../components/ListingCard";
import GenericH1 from "../../components/GenericH1";
import GenericOuterDiv from "../../components/GenericOuterDiv";

export default function Shop() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/items`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setAllItems(data);
        setItems(data); // ← ADD THIS LINE
      } catch (error) {
        console.error("Error fetching items:", error);
        setAllItems([]);
        setItems([]); // ← Also handle this fallback
      }
    };

    fetchItems();
  }, []);

  function handleFilterChange(selectedTags) {
    if (selectedTags.length === 0) {
      setItems(allItems);
    } else {
      const lowerSelectedTags = selectedTags.map((tag) => tag.toLowerCase());
      const filtered = allItems.filter((item) =>
        item.tags?.some((tag) => lowerSelectedTags.includes(tag.toLowerCase()))
      );
      setItems(filtered);
    }
  }

  return (
    <div>
      <GenericOuterDiv>
        <div className="bg-borders py-12">
          <GenericH1 className="text-center">Find Your Favorites</GenericH1>
          <div className="my-12">
            <Slider />
          </div>
        </div>
        <FilterBar onFilterChange={handleFilterChange} />

        <div className="w-[90%] max-w-[1400px] py-8 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))] gap-6 mx-auto">
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
