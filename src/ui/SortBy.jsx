import React from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";

  function hanleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(search);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={hanleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
