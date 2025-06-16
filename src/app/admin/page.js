"use client";
import { parseCookies } from "nookies";

// const checkAuthStatus = async () => {
//   try {
//     console.log("Here");
//     const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
//     const cookies = parseCookies(); // Make sure you have imported parseCookies
//     const token = cookies.token;

//     if (!token) {
//       window.location.replace("/login");
//       return; // No token, assume not authenticated
//     }

//     const response = await fetch(`${serverURL}/users/self`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       // Could not verify token or fetch user
//       window.location.replace("/login");
//       return;
//     }

//     const user = await response.json();
//     console.log(user);

//     // If user is not an Admin, redirect
//     if (!user.permissions || !user.permissions.includes("Admin")) {
//       window.location.replace("/login");
//     }
//   } catch (error) {
//     console.error("Error checking auth status:", error);
//     // Optionally clear token on error
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     window.location.replace("/");
//   }
// };

import AdminCard from "../components/AdminCard";
import Button from "../components/Button";
import GenericH1 from "../components/GenericH1";
import { useEffect, useState } from "react";
import { FetchItems } from "../modules/FetchItems";

export default function AdminPortal() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("listings");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      //await checkAuthStatus(); // Check admin status before loading events
      setLoading(true);

      try {
        if (activeTab === "listings") {
          const data = await FetchItems();
          setItems(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="py-8">
      <GenericH1 className="text-center">Admin Dashboard</GenericH1>
      <div className="w-full h-12 border-t-2 border-b-2 py-8 border-black flex items-center justify-around">
        <button
          onClick={() => setActiveTab("users")}
          className={`text-lg font-semibold ${
            activeTab === "users" ? "underline underline-offset-4" : ""
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("listings")}
          className={`text-lg font-semibold ${
            activeTab === "listings" ? "underline underline-offset-4" : ""
          }`}
        >
          Listings
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`text-lg font-semibold ${
            activeTab === "orders" ? "underline underline-offset-4" : ""
          }`}
        >
          Orders
        </button>
      </div>
      {activeTab === "users" && (
        <div className="min-h-screen flex flex-col">
          {/* Main Content */}
          <main className="flex-grow text-center my-[40px] mx-auto">
            <div className="p-6 mb-8 w-[85%] mx-auto">
              <h2 className={` text-3xl font-semibold text-gray-900`}>
                Something Awesome is Coming Soon
              </h2>
              <p className={` mt-2 text-lg text-gray-600`}>
                We’re working hard to bring you a brand new experience. Stay
                tuned for updates!
              </p>
            </div>
          </main>
        </div>
      )}
      {activeTab === "listings" && (
        <div>
          <Button
            className="sm:ml-12 mx-auto my-4 flex items-center w-fit"
            href="/createItem"
          >
            <span
              className="material-icons"
              style={{
                fontSize: "40px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              add_box
            </span>{" "}
            Add Item
          </Button>
          {loading ? (
            <div className="text-center text-xl py-12">Loading listings...</div>
          ) : (
            <div className="w-[90%] max-w-[1400px] py-8 grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(360px,_1fr))] gap-6 mx-auto">
              {items.map((item) => (
                <AdminCard
                  key={item.itemId}
                  itemId={item.itemId}
                  imgUrl={item.imgUrl}
                  infoTitle={item.title}
                  price={item.price}
                  className="w-[30%] mx-auto"
                />
              ))}
            </div>
          )}
        </div>
      )}
      {activeTab === "orders" && (
        <div className="min-h-screen flex flex-col">
          {/* Main Content */}
          <main className="flex-grow text-center my-[40px] mx-auto">
            <div className="p-6 mb-8 w-[85%] mx-auto">
              <h2 className={` text-3xl font-semibold text-gray-900`}>
                Something Awesome is Coming Soon
              </h2>
              <p className={` mt-2 text-lg text-gray-600`}>
                We’re working hard to bring you a brand new experience. Stay
                tuned for updates!
              </p>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
