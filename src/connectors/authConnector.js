export async function fetchSelfUser(token, serverURL) {
  const response = await fetch(`${serverURL}/users/self`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Invalid token or failed to fetch user.");
  }

  return await response.json();
}
