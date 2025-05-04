import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SearchBar({ placeholder, onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSearch = () => onSearch && onSearch(query);

  return (
    <div className="flex justify-center items-center py-6 lg:w-1/3 sm:w-3/4">
      <div
        className="flex items-center w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-3xl shadow-sm p-3 border 
      border-gray-300 transition-all duration-300"
      >
        <input
          className="w-full p-2 text-sm lg:text-base font-bold bg-transparent text-black placeholder-gray-300 focus:outline-none"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        <Button onClick={handleSearch} className="p-3 rounded-2xl">
          <Search />
        </Button>
      </div>
    </div>
  );
}
