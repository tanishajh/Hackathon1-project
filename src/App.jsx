import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import BotPress from "./components/BotPress";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <div className="bg-light-primary h-full font-poppins">
        <Navbar />
        <BotPress />
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
