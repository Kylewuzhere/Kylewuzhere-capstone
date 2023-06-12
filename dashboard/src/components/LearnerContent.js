"use client";
import React, { useState, useEffect, useRef } from "react";
import LearnerTable from "@/components/LearnerTable";
import SearchBar from "@/components/SearchBar";
import LoadingView from "@/components/LoadingView";
import PaginationControls from "./PaginationControls";

const LearnerContent = ({ selectedFilter }) => {
  const [loading, setLoading] = useState(false);
  const [learners, setLearners] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({ column: "name", order: "asc" });
  const searchTimeoutRef = useRef(null);

  const limit = 15;

  const fetchLearners = async (search = "") => {
    let url = `/api/learners?limit=${limit}&page=${currentPage}&filter=${selectedFilter}&sort=${sort.column}&order=${sort.order}
    `;

    if (search) {
      url += `&search=${search}`;
    }
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();
    setLearners(data.rows);
    setLoading(false);
  };

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1);
      fetchLearners(search);
    }, 500);
  }, [search]);

  useEffect(() => {
    fetchLearners();
  }, [currentPage, selectedFilter, sort]);

  const onSort = (column) => {
    if (sort.column === column) {
      setSort((prevSort) => ({
        column,
        order: prevSort.order === "asc" ? "desc" : "asc",
      }));
    } else {
      setSort({ column, order: "asc" });
    }
  };

  const getSortIcon = (column) => {
    if (sort.column === column) {
      return sort.order === "asc" ? <span>&#9650;</span> : <span>&#9660;</span>;
    }
    return null;
  };

  const nextDisabled = learners.length < limit ? true : false;

  if (loading) return <LoadingView />;

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      <LearnerTable
        content={learners}
        onSort={onSort}
        getSortIcon={getSortIcon}
      />
      <PaginationControls
        onPrev={() => {
          setCurrentPage(currentPage - 1);
        }}
        onNext={() => {
          setCurrentPage(currentPage + 1);
        }}
        currentPage={currentPage}
        nextDisabled={nextDisabled}
      />
    </div>
  );
};

export default LearnerContent;
