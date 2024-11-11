import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import themehook from "./AuthContext";

export default function Charts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userdata } = themehook();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3000/product/getFiveProducts/672f4c6484b7073ac76b40ec`
      );
      console.log(response.data.data);
      setData(response.data.data || []); // Ensure data is always an array
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const pieChartData = data.map((item, index) => ({
    id: index,
    value: item.products?.length || 0, // Number of products for each date
    label: item.date || `Date ${index + 1}`, // Fallback label if date is missing
  }));

  return (
    <div className="bg-light-primary p-10 flex flex-col justify-center items-center">
      {userdata ? ( // Check if userdata exists
        loading ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <>
            <h1 className="text-primary-dark text-lg font-bold py-4">
              Pie Chart of Products Expiring in the Next Few Days
            </h1>
            <PieChart
              series={[
                {
                  data: pieChartData.length
                    ? pieChartData
                    : [
                        {
                          id: 0,
                          value: data[0]?.products.length,
                          label: data[0]?.date,
                        },
                        {
                          id: 1,
                          value: data[1]?.products.length,
                          label: data[1]?.date,
                        },
                        {
                          id: 2,
                          value: data[2]?.products.length,
                          label: data[2]?.date,
                        },
                        {
                          id: 3,
                          value: data[3]?.products.length,
                          label: data[3]?.date,
                        },
                        {
                          id: 4,
                          value: data[4]?.products.length,
                          label: data[4]?.date,
                        },
                      ],
                  label: {
                    visible: true,
                    formatter: (value) =>
                      `<span style="color: white">${value}</span>`,
                  },
                },
              ]}
              width={600}
              height={300}
            />
          </>
        )
      ) : (
        <div className="text-center">
          <h1 className="text-primary-dark text-lg font-bold py-4">
            Please log in to view the chart.
          </h1>
          <button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
            onClick={() => (window.location.href = "/login")} // Redirect to login
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
}
