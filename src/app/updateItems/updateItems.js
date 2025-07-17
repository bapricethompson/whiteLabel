"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
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

        if (width > maxWidth || height > maxHeight) {
          const widthRatio = maxWidth / width;
          const heightRatio = maxHeight / height;
          const ratio = Math.min(widthRatio, heightRatio); // scale to fit within box
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Canvas is empty"));
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          },
          file.type,
          0.9
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
  if (!file) return null;

  try {
    const resizedFile = await resizeImage(file, 700, 500);

    const fileRef = ref(storage, `${folder}/${name}-${v4()}`);
    const metadata = { contentType: resizedFile.type };

    const snapshot = await uploadBytes(fileRef, resizedFile, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (err) {
    console.error("Image upload error:", err);
    throw err;
  }
}

export default function UpdateItem() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    imgUrl: "",
    sizes: false,
    tags: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkAuthStatus();
      if (!result) {
        // Redirect happens inside checkAuthStatus if unauthorized
        return;
      }
      setUser(result.user);
      setToken(result.token);
    };

    verifyAuth();
  }, []);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/items/${itemId}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch item");

        setFormData({
          title: data.title || "",
          price: data.price || "",
          description: data.description || "",
          imgUrl: data.imgUrl || "",
          sizes: !!data.sizes,
          tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
        });
      } catch (err) {
        showMessage(err.message, "error");
      } finally {
        setLoading(false);
      }
    }

    if (itemId) fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, price, description, imgUrl } = formData;

    if (!title || !price || !description) {
      showMessage("Title, price, and description are required.", "error");
      return;
    }

    setSubmitting(true);

    let finalImageUrl = imgUrl;

    if (imageFile) {
      try {
        finalImageUrl = await uploadFile(
          imageFile,
          "items",
          "items-" + title.replaceAll(" ", "_")
        );
      } catch (err) {
        setSubmitting(false);
        showMessage("Image upload failed.", "error");
        return;
      }
    }

    const payload = {
      ...formData,
      imgUrl: finalImageUrl,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      price: parseFloat(price),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_SERVER}/items/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update item.");

      showMessage("Item updated successfully!", "success");
      setTimeout(() => router.push("/admin"), 1500);
    } catch (err) {
      showMessage(err.message, "error");
    } finally {
      setSubmitting(false);
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
    "w-full px-4 py-3 rounded border border-gray-300  text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200";

  const messageStyle =
    messageType === "success"
      ? "text-green-600 font-medium text-sm"
      : "text-red-600 font-medium text-sm";

  return (
    <div className="w-[80%] md:w-[60%] lg:w-[40%] mx-auto p-8 bg-borders shadow-lg rounded-2xl my-12">
      <h2 className="text-3xl font-bold mb-6">Update Item</h2>

      {loading ? (
        <p className="text-center text-foreground">Loading item...</p>
      ) : (
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

          <div>
            <label className="block text-sm font-medium mb-1">
              Upload New Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
            {formData.imgUrl && !imageFile && (
              <img
                src={formData.imgUrl}
                alt="Current"
                className="mt-2 max-h-40 object-contain"
              />
            )}
            {imageFile && (
              <p className="mt-2 text-sm text-gray-700">{imageFile.name}</p>
            )}
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
              placeholder="e.g. summer, sale, cotton"
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
            disabled={submitting}
            className={`w-full py-3 px-6 font-semibold rounded-xl transition duration-200 shadow-md ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-darksage text-white hover:bg-sage hover:text-black"
            }`}
          >
            {submitting ? "Updating..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
