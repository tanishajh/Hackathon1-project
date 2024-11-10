import React from "react";
import image from "../assets/home_page.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen flex flex-col sm:flex-row">
      <section className="h-full w-full sm:w-1/2 flex flex-col justify-center items-center text-center p-2 sm:p-5">
        <h1 className="text-[36px] sm:text-[50px] text-primary-dark leading-tight">
          <span className="font-bold">Your Guide to Saving</span>
          <span className="font-semibold"> Food and Sharing Food</span>
        </h1>
        <p className=" text-[15px] sm:text-[18px] text-center text-secondary-DEFAULT leading-tight">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy
        </p>
        <Link
          to="#youritems"
          className="bg-primary DEFAULT my-2 text-white py-1 px-4 rounded hover:bg-primary-dark"
        >
          see your food items
        </Link>
      </section>
      <section className="h-full w-full sm:w-1/2 flex justify-center items-center">
        <img
          src={image}
          alt="Home Page"
          className="max-w-full max-h-full object-contain"
        />
      </section>
    </div>
  );
}

export default Home;
