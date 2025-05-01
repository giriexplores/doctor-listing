import { FaRegUserCircle } from "react-icons/fa";
import { FiMapPin, FiSearch, FiChevronDown } from "react-icons/fi";
import Link from "next/link";

const links = [
  "Buy Medicines",
  "Find Doctors",
  "Lab Tests",
  "Circle Membership",
  "Health Records",
  "Diabetes Reversal",
  "Buy Insurance",
];

export default function Navbar() {
  return (
    <nav className="w-full shadow-md">
      <div className="flex flex-col mx-auto max-w-[1320px]">
        <div className="flex items-center justify-between px-4 md:px-8 py-2">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <img
              src="/apollo247.svg"
              alt="Apollo 24/7"
              className="h-12 w-auto"
            />
            <div className="flex items-center gap-1 text-sm text-gray-700">
              <FiMapPin className="text-xl text-black font-semibold cursor-pointer" />
              <div className="inline-flex flex-col">
                <span className="text-sm font-light ">Select Location</span>
                <button className=" inline-flex cursor-pointer items-center text-base -mt-1 text-black font-semibold">
                  Select Address <FiChevronDown />
                </button>
              </div>
            </div>
          </div>

          {/* Center Section */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="relative w-full mx-auto border-gray-300 bg-gray-100 max-w-[40rem] border rounded-xl px-3 py-2">
              <FiSearch className="absolute top-[50%] -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="Search Doctors, Specialities, Conditions etc."
                className="w-full outline-none px-2 ps-10 text-sm placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 border-emerald-800 cursor-pointer text-emerald-800 border rounded-md px-3 py-2 text-sm hover:bg-gray-100 font-bold">
              <span>Login</span>
              <FaRegUserCircle className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full border-b border-gray-300"></div>

      {/* Bottom Links */}
      <div className="flex flex-col mx-auto max-w-[1200px]">
        <div className="hidden md:flex justify-center space-x-8 text-sm font-medium py-3">
          {links.map((link, index) => (
            <div key={index} className="flex items-center gap-2">
              <Link
                href="#"
                className=" font-semibold text-base hover:text-emerald-800 hover:underline hover:underline-offset-8 decoration-2 transition-colors"
              >
                {link}
              </Link>
              {link === "Buy Insurance" && (
                <span className="text-xs text-emerald-800 bg-emerald-100 rounded px-2">
                  New
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
