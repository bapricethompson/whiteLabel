import { parseCookies } from "nookies";
export async function FetchUsers() {
  const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
  let url = `${serverURL}/users`;
  const cookies = parseCookies();
  const token = cookies.token;

  console.log(token);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
