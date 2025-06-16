"use client";

import { useState } from "react";

export default function CreateItem() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    imgUrl: "",
    sizes: false,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, price, description, imgUrl } = formData;

    if (!title || !price || !description || !imgUrl) {
      showMessage("All fields are required.", "error");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create item.");
      }

      setFormData({
        title: "",
        price: "",
        description: "",
        imgUrl: "",
        sizes: false,
      });

      showMessage("Item created successfully!", "success");
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);

    if (type === "success") {
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200";

  const messageStyle =
    messageType === "success"
      ? "text-green-600 font-medium text-sm"
      : "text-red-600 font-medium text-sm";

  return (
    <div className="w-[80%] md:w-[60%] lg:w-[40%] mx-auto p-8 bg-borders shadow-lg rounded-2xl my-12">
      <h2 className="text-3xl font-bold mb-6">Create New Item</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="imgUrl" className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={inputClass}
            rows="4"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="sizes"
            checked={formData.sizes}
            onChange={handleChange}
            id="sizes"
          />
          <label htmlFor="sizes" className="text-sm font-medium">
            Has size options?
          </label>
        </div>

        {/* ✅ Message Section */}
        {message && <p className={messageStyle}>{message}</p>}

        <button
          type="submit"
          className="w-full bg-darksage py-3 px-6 font-semibold text-white rounded-xl font-medium hover:bg-sage hover:text-black transition duration-200 shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
