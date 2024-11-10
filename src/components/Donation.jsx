import React from "react";
import { useNavigate } from "react-router-dom";

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
  return (
    <div className="p-5 bg-primary-dark">
      <Header />
      <Stats />
      <section className="text-center mb-10">
        <h3 className="text-2xl mb-5 font-medium text-white">
          Select Your Action:
        </h3>
        <div className="flex justify-center gap-8">
          <div className=" bg-light-secondary shadow-md h-28 w-60 rounded-md flex justify-center items-center">
            <h1
              onClick={() => navigate("/donation")}
              className=" font-bold text-xl"
            >
              Donate
            </h1>
          </div>
          <div className=" bg-primary shadow-md h-28 w-60 rounded-md flex justify-center items-center">
            <h1
              onClick={() => navigate("/donation")}
              className=" font-bold text-xl text-white"
            >
              Check Donations
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donation;