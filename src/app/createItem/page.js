"use client";
import { useState, useRef, useEffect } from "react";
import { storage } from "../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { parseCookies } from "nookies";
import checkAuthStatus from "../../modules/CheckAuthStatus";

function resizeImage(file, maxWidth, maxHeight) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");

        let width = img.width;
        let height = img.height;

        // Scale proportionally
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error("Canvas is empty"));
            }
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          },
          file.type,
          0.9 // quality (for JPEG/webp)
        );
      };

      img.onerror = reject;
      img.src = event.target.result;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function uploadFile(file, folder, name) {
  if (!file) return false;

  try {
    const resizedFile = await resizeImage(file, 700, 500); // ✅ Resize before upload

    const fileRef = ref(storage, `${folder}/${name}-${v4()}`);
    const metadata = { contentType: resizedFile.type };

    const snapshot = await uploadBytes(fileRef, resizedFile, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (err) {
    console.error("Image processing/upload error:", err);
    throw err;
  }
}

export default function CreateItem() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    sizes: false,
    tags: "",
  });
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        console.log("EEEEE");
        const result = await checkAuthStatus();
        console.log("E", result);
        if (result) {
          setUser(result.user);
          setToken(result.token);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = null;

    if (imageFile) {
      console.log("formData", formData.title);
      try {
        imageUrl = await uploadFile(
          imageFile,
          "items",
          "items-" + formData.title.replaceAll(" ", "_")
        );
      } catch (err) {
        console.error("Image upload error:", err);
        setError("Image upload failed");
        return;
      }
    }

    const { title, price, description, tags, sizes } = formData;

    if (!title || !price || !description || !imageFile) {
      showMessage("All fields are required, including an image.", "error");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    // Create JSON payload
    const payload = {
      title,
      price: parseFloat(price), // Ensure price is a number
      description,
      sizes,
      tags: tagsArray,
      imgUrl: imageUrl,
    };

    console.log("Payload:", payload); // Debug log

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      console.log("AAAA");
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create item.");

      setFormData({
        title: "",
        price: "",
        description: "",
        sizes: false,
        tags: "",
      });
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Reset file input
      }

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

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        encType="multipart/form-data"
      >
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
        <div className="w-[80%] text-left">
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            ref={fileInputRef}
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

        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g. casual, summer, cotton"
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
