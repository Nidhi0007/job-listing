
import React, { useState } from "react";
import Search from "../components/Search";
import JobsListing from "../components/JobsListing";

export default function List() {
  const [filters, setFilters] = useState({ q: "", loc: [], dept: [], fun: [] });
  return (
    <div>
    <Search filters={filters} setFilters={setFilters}/>
    <JobsListing filters={filters} />
  </div>
  );
}