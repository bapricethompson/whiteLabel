"use client";

import { useState } from "react";
import FilterButton from "./FilterButton";
import ClearButton from "./ClearButton";

const tagOptions = [
  "Popular",
  "New",
  "Handmade",
  "Clothing",
  "Accessories",
  "Limited Edition",
  "Sale",
  "Best-Seller",
];

export default function FilterBar({ onFilterChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    onFilterChange?.([]);
  };

  const handleApplyFilters = () => {
    onFilterChange?.(selectedTags);
    setShowDropdown(false);
  };

  return (
    <div className="w-[80%] flex justify-between mx-auto py-12">
      <ClearButton onClick={clearFilters} />
      <FilterButton
        onClick={() => setShowDropdown(!showDropdown)}
        active={showDropdown}
      >
        <div
          className="overflow-y-auto text-base max-h-[240px] px-4"
          onMouseLeave={() => setShowDropdown(false)}
        >
          {tagOptions.map((tag) => (
            <label key={tag} className="flex items-center py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="mr-2"
              />
              {tag}
            </label>
          ))}

          {/* Sticky Apply button */}
          <div className=" p-2 bg-background flex justify-end sticky ">
            <button
              onClick={() => {
                handleApplyFilters();
                setShowDropdown(false);
              }}
              className="px-4 py-1 bg-accent rounded hover:bg-accentHover text-white"
            >
              Apply
            </button>
          </div>
        </div>
      </FilterButton>
    </div>
  );
}
