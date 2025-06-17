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
      />
      {showDropdown && (
        <div
          className="absolute top-full mt-2 right-0 w-[50%] md:w-[20%] bg-background border border-borders rounded shadow max-h-64 z-10 flex flex-col"
          onMouseLeave={() => setShowDropdown(false)}
        >
          {/* Scrollable tags container */}
          <div className="overflow-y-auto text-base max-h-[240px] px-4">
            {tagOptions.map((tag) => (
              <label
                key={tag}
                className="flex items-center py-2  cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                  className="mr-2"
                />
                {tag}
              </label>
            ))}
          </div>

          {/* Fixed footer with Apply button */}
          <div className="border-t p-2 bg-background flex justify-end sticky bottom-0">
            <button
              onClick={handleApplyFilters}
              className="px-4 py-1 bg-accent  rounded hover:bg-accentHover text-white"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
