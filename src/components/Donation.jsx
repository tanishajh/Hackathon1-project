import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

const Header = () => {
  return (
    <header className="text-center mb-5 mt-5">
      <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
        Join Us in Making a Difference: Donate Today
      </h1>
      <p className="text-lg text-white max-w-2xl mx-auto">
        Hundreds of Organizations, Big and Small, Have Made a Lasting Impact
        with Our Support
      </p>
    </header>
  );
};

const Stats = () => {
  const statsData = [{ value: "180K", label: "In annual revenue" }];

  return (
    <section className="flex justify-center mb-5">
      {statsData.map((stat, index) => (
        <div key={index} className="text-center">
          <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
          <p className="text-white">{stat.label}</p>
        </div>
      ))}
    </section>
  );
};

const Donation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/donation/getFiveDonations/672f4c6484b7073ac76b40ec"
        );
        const donations = response.data.data;
        const parsedData = donations.map((donation, index) => ({
          id: index,
          value: donation.count,
          label: new Date(donation.date).toLocaleDateString("en-GB"),
        }));
        setChartData(parsedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donation data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-5 bg-primary-dark">
      <Header />
      <Stats />
      <section className="text-center mb-10">
        <h3 className="text-2xl mb-5 font-medium text-white">
          Select Your Action:
        </h3>
        <div className="flex justify-center gap-8">
          <div
            className="bg-light-secondary shadow-md h-28 w-60 rounded-md flex justify-center items-center cursor-pointer"
            onClick={() => navigate("/donation")}
          >
            <h1 className="font-bold text-xl">Donate</h1>
          </div>
          <div
            className="bg-primary shadow-md h-28 w-60 rounded-md flex justify-center items-center cursor-pointer"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <h1 className="font-bold text-xl text-white">Check Donations</h1>
          </div>
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="bg-light-primary p-10 flex flex-col justify-center items-center">
              {loading ? (
                <h1 className="text-primary-dark text-lg font-bold py-4">
                  Loading...
                </h1>
              ) : (
                <>
                  <h1 className="text-primary-dark text-lg font-bold py-4">
                    <li>Pie Chart of Your Donations</li>
                  </h1>
                  <PieChart
                    series={[
                      {
                        data: chartData,
                        label: {
                          visible: true,
                          formatter: (value) =>
                            `<span style="color: white">${value}</span>`,
                        },
                      },
                    ]}
                    width={450}
                    height={220}
                  />
                </>
              )}
            </div>
          </div>
        </dialog>
      </section>
    </div>
  );
};

export default Donation;
