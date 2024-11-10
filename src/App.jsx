import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
// import BotPress from "./components/BotPress";
import Layout from "./components/Layout";
import AddItem from "./components/AddItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/Login";
import DonationPage from "./components/Donationpage";
import { AuthContext } from "./components/AuthContext";
import Chatbot from "./components/BotPress";
import Map from "./components/Map";
import About from "./components/About";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  return (
    <AuthContext>
      <Router>
        <div className="bg-light-primary h-full font-poppins">
          <Navbar />
          <Chatbot />

          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/map" element={<Map />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addItem" element={<AddItem />} />
            <Route path="/donation" element={<DonationPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/FeedbackForm" element={<FeedbackForm />} />
          </Routes>
        </div>

        <ToastContainer />
      </Router>
    </AuthContext>
  );
}

export default App;
