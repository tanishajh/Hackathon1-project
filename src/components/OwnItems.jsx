import axios from "axios";
import React, { useEffect, useState } from "react";
import themehook from "./AuthContext";

function OwnItems() {
  const [itemData, setItemData] = useState([]);
  const { userdata, username, setuserdata, setusername } = themehook();

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:3000/product/getLastTenProducts/${userdata?._id}`
    );
    // console.log(res.data.products);
    setItemData(res.data.products);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white p-10 py-20" id="youritems">
      <div className="bg-gray-50 shadow-lg rounded-lg overflow-hidden p-2">
        <h1 className="text-sm text-primary sm:m-5 sm:mb-0">
          Your added items
        </h1>
        <p className=" text-lg ml-5">
          Add products to get reminder 2 days before they get expired
        </p>
        <div className="overflow-x-auto my-2">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>EXP</th>
              </tr>
            </thead>
            <tbody>
              {itemData.length > 0 ? (
                itemData.map((item, index) => (
                  <tr key={item.id || index}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      {new Date(item.expiryDate).toLocaleDateString("en-US")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    style={{ textAlign: "center", padding: "16px" }}
                  >
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OwnItems;
