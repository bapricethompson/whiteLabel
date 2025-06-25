import { FetchSingleItem } from "../modules/FetchSingleItem";
import Sizes from "./Sizes";
import Button from "./Button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { setCookie, parseCookies } from "nookies";

export default function GettingItem() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    async function loadItem() {
      setLoading(true);
      setError(null);
      try {
        const data = await FetchSingleItem(itemId);
        setItem(data);
      } catch (err) {
        setError("Failed to load item.");
        console.error("Error fetching item:", err);
      } finally {
        setLoading(false);
      }
    }

    if (itemId) {
      loadItem();
    } else {
      setLoading(false);
      setError("No item ID provided.");
    }
  }, [itemId]);

  if (loading) {
    return <div className="text-center py-80">Loading item details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-12">{error}</div>;
  }

  if (!item) {
    return null;
  }

  const handleAddToCart = () => {
    console.log("ITEM", item);
    const cookies = parseCookies();
    let cart = [];

    // Try parsing existing cart from cookies
    if (cookies.cart) {
      try {
        cart = JSON.parse(cookies.cart);
      } catch (error) {
        console.error("Error parsing cart cookie", error);
      }
    }

    // Check if item is already in cart
    const index = cart.findIndex((i) => i.id === item.itemId);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        id: item.itemId,
        title: item.title,
        price: item.price,
        quantity: 1,
      });
    }

    // Set the updated cart cookie (client-side only)
    setCookie(null, "cart", JSON.stringify(cart), {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    alert("Added to cart!");
  };

  return (
    <div>
      <Button
        href="/shop"
        className="flex justify-between items-center w-fit mt-8 ml-8"
        variant="second"
      >
        <span
          className="material-icons"
          style={{
            fontSize: "25px",
            marginRight: "5px",
          }}
        >
          arrow_back_ios
        </span>{" "}
        Back
      </Button>
      <div className="flex flex-col md:flex-row justify-between items-center w-[90%] md:w-[80%] mx-auto py-8  gap-6 h-[80vh]">
        <div className="relative w-full md:w-1/2 h-[400px] rounded overflow-hidden">
          <Image
            src={item.imgUrl}
            alt={item.title || "Info image"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", borderRadius: "inherit" }}
            quality={90}
          />
        </div>

        <div className="w-full md:w-1/2 px-4 md:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl">{item.title}</h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl mt-2">
            ${item.price}
          </h2>
          {item.sizes && <Sizes />}
          <p className="mt-4">{item.description}</p>
          <div className="text-center md:text-left">
            <Button className="my-4" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
          <hr className="bg-steel h-[2px]"></hr>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="font-semibold">Tags:</span>
            {item.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-1 text-sm bg-sage text-black rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
