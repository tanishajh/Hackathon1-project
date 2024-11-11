import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import themehook from "./AuthContext";
import { BiLogOut } from "react-icons/bi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userdata, username, setuserdata, setusername } = themehook();

  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu when a link is clicked
  };

  return (
    <nav className="sticky top-0 z-50 bg-light-primary w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-primary-dark text-2xl font-bold">
              अन्नसेवा
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link
              to={"/addItem"}
              className="text-secondary-dark hover:text-primary-dark"
            >
              Add item
            </Link>
            <Link
              to={"/donation"}
              className="text-secondary-dark hover:text-primary-dark"
            >
              Donation
            </Link>
            <Link
              to={"/about"}
              className="text-secondary-dark hover:text-primary-dark"
            >
              About us
            </Link>
            <Link
              to={"/FeedbackForm"}
              className="text-secondary-dark hover:text-primary-dark"
            >
              Feedback
            </Link>
          </div>
          {userdata ? (
            <div className="hidden md:flex space-x-4 font-bold items-end">
              <h1>{username}</h1>
              <span
                className="cursor-pointer"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                <BiLogOut size={20} />
              </span>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="text-secondary-dark border border-secondary-dark py-1 px-4 rounded hover:bg-secondary-light"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-white py-1 px-4 rounded hover:bg-primary-dark"
              >
                Sign Up
              </Link>
            </div>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary-dark focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-secondary-light">
          <Link
            to={"/addItem"}
            className="block py-2 px-4 text-secondary-dark hover:text-primary-dark"
            onClick={handleLinkClick} // Close the menu
          >
            Add item
          </Link>
          <Link
            to={"/donation"}
            className="block py-2 px-4 text-secondary-dark hover:text-primary-dark"
            onClick={handleLinkClick} // Close the menu
          >
            Donation
          </Link>
          <Link
            to={"/about"}
            className="block py-2 px-4 text-secondary-dark hover:text-primary-dark"
            onClick={handleLinkClick} // Close the menu
          >
            About
          </Link>
          <Link
            to={"/FeedbackForm"}
            className="block py-2 px-4 text-secondary-dark hover:text-primary-dark"
            onClick={handleLinkClick} // Close the menu
          >
            Feedback
          </Link>
          {userdata ? (
            <div className="flex space-x-4 py-2 px-4 font-bold">
              <h1>{username}</h1>
              <span
                className="cursor-pointer"
                onClick={() => {
                  handleLinkClick();
                  document.getElementById("my_modal_1").showModal();
                }}
              >
                <BiLogOut size={20} />
              </span>
            </div>
          ) : (
            <div className="py-2 px-4 flex space-x-4">
              <Link
                to="/login"
                className="text-secondary-dark border border-secondary-dark py-1 px-4 rounded w-full hover:bg-secondary-light"
                onClick={handleLinkClick} // Close the menu
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-primary text-white py-1 px-4 rounded w-full hover:bg-primary-dark"
                onClick={handleLinkClick} // Close the menu
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <p className="py-4">Do you want to logout?</p>
          <div className="modal-action">
            <form
              method="dialog"
              onClick={() => {
                setuserdata(null);
                setusername(null);
              }}
            >
              <button className="btn">Yes</button>
            </form>
            <form method="dialog">
              <button className="btn">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </nav>
  );
}
