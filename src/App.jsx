import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import BotPress from "./components/BotPress";

function App() {
  return (
    <Router>
      <div className="bg-light-primary h-screen font-poppins">
        <Navbar />
        <BotPress />
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-center mt-8 text-3xl">Welcome to name</h1>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
