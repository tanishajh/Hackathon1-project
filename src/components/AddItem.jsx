import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import themehook from "./AuthContext";
import nonveg from "../assets/non-veg.png";
import grosary from "../assets/grosary.jpeg";
import fruits from "../assets/Fruits.jpeg";
import Vegetables from "../assets/Vegetables.jpeg";
import Dairy from "../assets/Dairy.jpeg";

function AddItem() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const { userdata } = themehook();
  const [formData, setFormData] = useState({
    name: "",
    expDate: "",
  });

  const [categoryData, setCategoryData] = useState([]);
  const [dateArray, setDateArray] = useState([]);

  const getCategoryData = async () => {
    const data = await axios.get(
      "http://localhost:3000/category/getAllCategories"
    );
    setCategoryData(data.data.category);
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const getOneCategory = async (id) => {
    const data = await axios.get(
      `http://localhost:3000/category/getCategory/${id}`
    );
    setDateArray(data.data.Category.items);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFormVisible(true);
    getOneCategory(category);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      const matchedItem = dateArray.find(
        (item) => item.name.toLowerCase() === value.toLowerCase()
      );
      if (matchedItem) {
        const today = new Date();
        const expDate = new Date(today);
        expDate.setDate(today.getDate() + matchedItem.expiry);

        setFormData({
          name: matchedItem.name,
          expDate: expDate.toISOString().split("T")[0],
        });
      } else {
        setFormData({
          name: value,
          expDate: "",
        });
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const imageArray = [
    { src: nonveg, alt: "Assorted non-vegetarian items" },
    { src: grosary, alt: "Grocery items" },
    { src: fruits, alt: "A variety of fresh fruits" },
    { src: Vegetables, alt: "A variety of fresh vegetables" },
    { src: Dairy, alt: "Dairy products like milk, cheese, and yogurt" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name: formData.name,
      expiryDate: formData.expDate,
      send: 0,
      userId: userdata._id,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/product/createProduct",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Form Submitted: ", payload);
        toast("Product created successfully!");
        setSelectedCategory("");
        setFormVisible(false);
        setFormData({ name: "", expDate: "" });
        Navigate("/");
      } else {
        console.error("Failed to submit form", response.statusText);
        toast("Error creating product");
      }
    } catch (error) {
      console.error("Error:", error);
      toast("Network error, try again later");
    }
  };

  return (
    <div className=" bg-white flex flex-col items-center justify-center h-[90vh]">
      <h1 className=" font-bold text-lg my-2 text-primary-dark">Add Item</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {categoryData.map((category, index) => (
          <div
            key={index}
            style={{
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => handleCategoryClick(category._id)}
          >
            <img
              src={
                imageArray[index]?.src ||
                "https://via.placeholder.com/100?text=Image"
              }
              alt={imageArray[index]?.alt || "Category image"}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              className="rounded-full"
            />
            <p className="my-2">{category.name}</p>
          </div>
        ))}
      </div>

      {formVisible && (
        <div className="w-full flex items-center justify-center">
          <form onSubmit={handleSubmit} className="mt-2 w-1/2">
            <h2 className="mb-4">Category: {selectedCategory}</h2>

            <div className="mb-2">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <br />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border px-4 py-[6px] w-full rounded focus:outline-none"
              />
            </div>

            <div className="mb-2">
              <label htmlFor="expDate" className="font-semibold">
                Expiration Date:
              </label>
              <input
                type="date"
                id="expDate"
                name="expDate"
                value={formData.expDate}
                onChange={handleInputChange}
                className="border px-[2px] py-[6px] w-full rounded focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-primary DEFAULT text-white py-1 px-4 rounded hover:bg-primary-dark"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddItem;
