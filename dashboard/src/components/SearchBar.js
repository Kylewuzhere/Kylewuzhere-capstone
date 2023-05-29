"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <form role="search">
        <div>
          <input
            type="search"
            id="mysearch"
            placeholder="Search Name"
            name="q"
          />
          <button>Search</button>
        </div>
      </form>
    </div>
  );
}
