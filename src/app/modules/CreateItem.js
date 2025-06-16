"use client";
import { parseCookies } from "nookies";

export async function PostItem(title, price, description, imgUrl, sizes) {
  const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
  const url = `${serverURL}/items`;
  //const cookies = parseCookies();
  //const token = cookies.token;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      price,
      description,
      imgUrl,
      sizes,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to post event");
  }

  return res.json();
}
