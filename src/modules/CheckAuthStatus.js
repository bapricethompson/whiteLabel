import { parseCookies } from "nookies";

const checkAuthStatus = async () => {
  try {
    console.log("NEW FRONT AUTH");
    const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
    const cookies = parseCookies(); // Make sure you have imported parseCookies
    const token = cookies.token;

    if (!token) {
      window.location.replace("/login");
      return; // No token, assume not authenticated
    }
    console.log("COOKIES", cookies);
    console.log("token", token);

    const response = await fetch(`${serverURL}/users/self`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("FAIL");
      // Could not verify token or fetch user
      window.location.replace("/login");
      return;
    }

    const user = await response.json();
    console.log(user, token);

    //If user is not an Admin, redirect
    if (!user.permissions || !user.permissions.includes("Admin")) {
      window.location.replace("/home");
    }

    return { user, token };
  } catch (error) {
    console.error("Error checking auth status:", error);
    // Optionally clear token on error
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/");
  }
};

export default checkAuthStatus;
