import React, { useState } from "react";
import { toast } from "react-toastify";

function AddItem() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    expDate: "",
  });

  const categories = [
    { name: "Fruits", image: "https://via.placeholder.com/100?text=Fruits" },
    {
      name: "Vegetables",
      image: "https://via.placeholder.com/100?text=Vegetables",
    },
    { name: "Dairy", image: "https://via.placeholder.com/100?text=Dairy" },
    {
      name: "Beverages",
      image: "https://via.placeholder.com/100?text=Beverages",
    },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setFormVisible(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted: ", {
      category: selectedCategory,
      ...formData,
    });
    toast("Wow so easy!");
    setSelectedCategory("");
    setFormVisible(false);
    setFormData({ name: "", expDate: "" });
  };

  return (
    <div className=" bg-white flex flex-col items-center justify-center h-[90vh]">
      <h1 className=" font-bold text-lg my-2 text-primary-dark">Add Item</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              className=" rounded-full"
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
