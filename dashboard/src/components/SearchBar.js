"use client";
import React, { useState } from "react";

export default function SearchBar({ setSearch }) {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    const result = event.target.value.replace(/[^a-z\p{L} ]/giu, "");
    setInput(result);
    setSearch(result); 
  };

  return (
    <div className="flex justify-end mr-10 mt-5">
      <form role="search" className="flex" onSubmit={(e) => e.preventDefault()}>
        <button
          type="submit"
          className="bg-white px-4 py-1.5 border border-grey-dark border-r-0 rounded-l-lg focus:outline-none"
        >
          🔎
        </button>
        <input
          type="search"
          id="mysearch"
          placeholder="Search Learner Name"
          name="search"
          value={input}
          onChange={handleChange}
          className="px-4 py-1.5 bg-blue-500 border border-grey-dark border-l-0 font-semibold rounded-r-lg focus:outline-none"
        />
      </form>
    </div>
  );
}
