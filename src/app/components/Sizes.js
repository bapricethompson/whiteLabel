import { useState } from "react";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function SizeSelector({ onSelect }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleClick = (size) => {
    setSelectedSize(size);
    if (onSelect) onSelect(size);
  };

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => handleClick(size)}
          className={`px-4 py-2 rounded border ${
            selectedSize === size
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
