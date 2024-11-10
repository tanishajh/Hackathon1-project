import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

export default function Charts() {
  const [data, setdata] = useState();

  const getData = async () => {
    const data = await axios.get(
      `http://localhost:3000/product/getFiveProducts/672f4c6484b7073ac76b40ec`
    );
    console.log(data.data.data);
    setdata(data.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" bg-light-primary p-10 flex flex-col justify-center items-center">
      <h1 className=" text-primary-dark text-lg font-bold py-4">
        <li>Pie Chart of Products Expiring in the Next Few Days</li>
      </h1>
      <PieChart
        series={[
          {
            // data: [
            //   { id: 0, value: data[0]?.products.length, label: data[0]?.date },
            //   { id: 1, value: data[0]?.products.length, label: data[1]?.date },
            //   { id: 2, value: data[0]?.products.length, label: data[2]?.date },
            //   { id: 3, value: data[0]?.products.length, label: data[3]?.date },
            //   { id: 4, value: data[0]?.products.length, label: data[4]?.date },
            // ],
            data: [
              { id: 0, value: "30", label: "11 - 11 - 2024" },
              { id: 1, value: "20", label: "11 - 11 - 2024" },
              { id: 2, value: "10", label: "11 - 11 - 2024" },
              { id: 3, value: "15", label: "11 - 11 - 2024" },
              { id: 4, value: "40", label: "11 - 11 - 2024" },
            ],
            // Use labelFormatter to change label appearance
            label: {
              visible: true,
              formatter: (value) => {
                return `<span style="color: white">${value}</span>`; // Set color to white
              },
            },
          },
        ]}
        width={600}
        height={300}
      />
    </div>
  );
}
