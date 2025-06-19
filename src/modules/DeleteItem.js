import { parseCookies } from "nookies";
export async function DeleteItem(userId) {
  const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
  let url = `${serverURL}/items/${userId}`;

  const cookies = parseCookies();
  const token = cookies.token;
  console.log("COOKIE", cookies);
  console.log(token);
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete item");
  }

  return res.json();
}
