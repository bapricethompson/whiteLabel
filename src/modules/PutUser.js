"use client";
import { parseCookies } from "nookies";

export async function PutUser(uid, permissions) {
  const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
  const cookies = parseCookies();
  const token = cookies.token;

  const response = await fetch(`${serverURL}/users/changePermission`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ uid, Permission: permissions }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to update user permissions");
  }

  const data = await response.json();
  return data;
}
