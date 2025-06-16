"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { DeleteItem } from "../modules/DeleteItem";

export default function AdminCard({ itemId, imgUrl, infoTitle, price }) {
  const [deleted, setDeleted] = useState(false);
  const handleDelete = async () => {
    try {
      await DeleteItem(itemId);
      setDeleted(true); // ✅ trigger removal from UI
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  };
  if (deleted) return null;
  return (
    <div className="h-full flex flex-col text-left rounded-xl py-6 px-4  shadow-lg transition-all duration-300 ease-in-out ">
      <div className="mr-0 w-full flex justify-end pb-2 space-x-2">
        <Link
          className="text-gray-600 hover:text-blue-500"
          href={`/updateItems?itemId=${itemId}`}
        >
          <span className="material-icons">edit</span>
        </Link>
        <button
          onClick={() => handleDelete(itemId)}
          className="text-gray-600 hover:text-red-500"
          title="Delete"
        >
          <span className="material-icons">delete</span>
        </button>
      </div>
      <div className="relative w-[90%] aspect-[5/6] mx-auto mb-6 rounded overflow-hidden">
        <Image
          src={imgUrl}
          alt={infoTitle || "Info image"}
          fill
          style={{ objectFit: "cover", borderRadius: "inherit" }}
        />
      </div>
      <div className="w-[80%] ml-8">
        <h1 className="text-2xl font-semibold">{infoTitle}</h1>
        <h2 className="text-lg py-2">${price}</h2>
      </div>
    </div>
  );
}
