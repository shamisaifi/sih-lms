import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="relative w-full max-w-xl">
      <Link to="/portal/search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anything..."
          className="w-full p-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-1 focus:ring-black"
        />
      </Link>
      <IoMdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
    </div>
  );
};

export default SearchBar;
