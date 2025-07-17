import { parseCookies } from "nookies";
import { fetchSelfUser } from "../connectors/authConnector";
import { toUserObject } from "../gateways/authGateway";
import { isAdmin } from "../services/authService";

export async function checkAuthStatus() {
  try {
    const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
      window.location.replace("/login");
      return;
    }

    const apiUser = await fetchSelfUser(token, serverURL);
    const user = toUserObject(apiUser);

    if (!isAdmin(user)) {
      window.location.replace("/home");
      return;
    }

    return { user, token };
  } catch (error) {
    console.error("Error checking auth status:", error);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/");
  }
}

export default checkAuthStatus;
