export async function DeleteItem(itemId) {
  const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
  const url = `${serverURL}/items/${itemId}`;

  const res = await fetch(url, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete item");
  }

  return res.json();
}
