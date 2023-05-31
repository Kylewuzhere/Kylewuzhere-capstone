"use client";
import React, { useState } from "react";
// SearchBar is a client component that lets users search for learners by name.
// upon submission, the searchbar will set a search query with the name "search"
// formatted as: currentURL + ?search= + input-value

export default function SearchBar() {
  const [input, setInput] = useState("");

  // replaces all non-alphabetic characters with an empty string, unless it's a space
  // ref: https://bobbyhadz.com/blog/react-input-only-letters
  const handleChange = (event) => {
    const result = event.target.value.replace(/[^a-z\p{L} ]/giu, "");

    setInput(result);
  };

  return (
    <div className="flex justify-end mr-10 mt-5">
      <form role="search" className="flex">
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
