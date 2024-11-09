import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-light-primary w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-primary-dark text-2xl font-bold">
              logo
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              to="#"
              className="text-secondary-dark hover:text-primary-dark"
            >
              Products
            </Link>
            <Link
              to="#"
              className="text-secondary-dark hover:text-primary-dark"
            >
              Customers
            </Link>
            <Link
              to="#"
              className="text-secondary-dark hover:text-primary-dark"
            >
              Pricing
            </Link>
            <Link
              to="#"
              className="text-secondary-dark hover:text-primary-dark"
            >
              Learn
            </Link>
          </div>

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
          <a
            href="#"
            className="block py-2 px-4 text-secondary-dark hover:text-primary-dark"
          >
            Products
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-secondary-dark hover:text-primary-dark"
          >
            Customers
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-secondary-dark hover:text-primary-dark"
          >
            Pricing
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-secondary-dark hover:text-primary-dark"
          >
            Learn
          </a>
          <div className="py-2 px-4 flex space-x-4">
            <Link
              to="/login"
              className="text-secondary-dark border border-secondary-dark py-1 px-4 rounded w-full hover:bg-secondary-light"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-primary text-white py-1 px-4 rounded w-full hover:bg-primary-dark"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
