// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import BotPress from "./components/BotPress";
import Layout from "./components/Layout";
import AddItem from "./components/AddItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/Login";
import DonationPage from "./components/Donationpage"; // Make sure this import is correct

function App() {
  return (
    <Router>
      <div className="bg-light-primary h-full font-poppins">
        <Navbar />
        
        {/* Optional BotPress chatbot */}
        <BotPress />
        
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Layout />} />
          
          {/* Login route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* SignUp route */}
          <Route path="/signup" element={<SignUp />} />
          
          {/* Add Item route */}
          <Route path="/addItem" element={<AddItem />} />

          {/* Donation page route */}
          <Route path="/donation" element={<DonationPage />} />
        </Routes>
      </div>
      
      {/* Toast notifications */}
      <ToastContainer />
    </Router>
  );
}

export default App;
