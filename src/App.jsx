import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Login from "./components/Login";
import SignUp from "./components/SignUp";
import BotPress from "./components/BotPress";
import Layout from "./components/Layout";
import AddItem from "./components/AddItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/Login"; // Make sure this import is correct

function App() {
  return (
    <Router>
      <div className="bg-light-primary h-full font-poppins">
        <Navbar />
        {/* Only render BotPress here if needed */}
        <BotPress />

        <Routes>
          {/* Home route */}
          <Route path="/" element={<Layout />} />
          {/* Login route */}
          <Route path="/login" element={<LoginPage />} />{" "}
          {/* Ensure LoginPage is only here */}
          {/* SignUp route */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addItem" element={<AddItem />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
