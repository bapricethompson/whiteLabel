"use client";
import { parseCookies } from "nookies";

const checkAuthStatus = async () => {
  try {
    console.log("Here");
    const serverURL = process.env.NEXT_PUBLIC_REACT_APP_SERVER;
    const cookies = parseCookies(); // Make sure you have imported parseCookies
    const token = cookies.token;

    if (!token) {
      window.location.replace("/login");
      return; // No token, assume not authenticated
    }

    const response = await fetch(`${serverURL}/users/self`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Could not verify token or fetch user
      window.location.replace("/login");
      return;
    }

    const user = await response.json();
    console.log("MY USER", user);

    // If user is not an Admin, redirect
    if (!user.permissions || !user.permissions.includes("Admin")) {
      window.location.replace("/");
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
    // Optionally clear token on error
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/");
  }
};

import AdminCard from "../../components/AdminCard";
import Button from "../../components/Button";
import GenericH1 from "../../components/GenericH1";
import { useEffect, useState } from "react";
import { FetchItems } from "../../modules/FetchItems";
import { FetchUsers } from "../../modules/FetchUsers";
import { DeleteUser } from "../../modules/DeleteUser";
import { PutUser } from "../../modules/PutUser";

export default function AdminPortal() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("listings");
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    permissions: "",
  });

  const startEdit = (user) => {
    setEditingId(user.uid);
    setEditForm({
      permissions: user.permissions || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", email: "", permissions: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    await PutUser(id, editForm.permissions);
    const updatedUsers = await FetchUsers();
    setAllUsers(updatedUsers);
    cancelEdit();
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const res = await DeleteUser(userId);

      if (res.ok) {
        alert("User deleted successfully.");
        const updatedUsers = await FetchUsers();
        setAllUsers(updatedUsers);
      } else {
        const error = await res.json();
        alert(`Failed to delete: ${error.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      const updatedUsers = await FetchUsers();
      setAllUsers(updatedUsers);
      //alert("An error occurred while deleting the user.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await checkAuthStatus(); // Check admin status before loading events
      setLoading(true);

      try {
        if (activeTab === "listings") {
          const data = await FetchItems();
          setItems(data);
        } else if (activeTab === "users") {
          const getUsers = await FetchUsers();
          console.log("hhhh", getUsers);
          setAllUsers(getUsers);
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
        <div className="py-8">
          {console.log("Users array:", allUsers)}
          <ul className="w-[90%] max-w-3xl mx-auto space-y-4">
            {allUsers.map((user) => (
              <li
                key={user.uid}
                className="border p-4 rounded shadow-sm text-black"
              >
                <div className="mr-0 w-full flex justify-end space-x-2">
                  {editingId === user.uid ? (
                    <>
                      <button
                        onClick={() => handleSave(user.uid)}
                        className="text-green-600 hover:text-green-800"
                        title="Save"
                      >
                        <span className="material-icons">save</span>
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 hover:text-gray-900"
                        title="Cancel"
                      >
                        <span className="material-icons">close</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(user)}
                        className="text-gray-600 hover:text-blue-500"
                        title="Edit"
                      >
                        <span className="material-icons">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(user.uid)}
                        className="text-gray-600 hover:text-red-500"
                        title="Delete"
                      >
                        <span className="material-icons">delete</span>
                      </button>
                    </>
                  )}
                </div>

                {editingId === user.uid ? (
                  <div className="space-y-2">
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <div>
                      <label className="block text-sm">Permissions</label>
                      <input
                        type="text"
                        name="permissions"
                        value={editForm.permissions}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        placeholder="e.g., Admin, Paid"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Permissions:</strong>{" "}
                      {Array.isArray(user.permissions)
                        ? user.permissions.join(", ")
                        : user.permissions}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
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
              <h2 className={` text-3xl font-semibold text-primaryText`}>
                Something Awesome is Coming Soon
              </h2>
              <p className={` mt-2 text-lg text-primaryText`}>
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
