export async function FetchSingleItem(itemId) {
  const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
  let url = `${serverURL}/items/${itemId}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }

  return res.json();
}
