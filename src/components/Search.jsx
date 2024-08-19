import React from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ searchTerm, setSearchTerm, setSearchData ,setPage}) => {
  return (
    <div className="th-form">
      <form>
        <div className="th-search-wrapper">
          <input
            className="th-search small search-icon"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
          <button
            className="th-search-btn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setSearchData(searchTerm);
            }}
          >
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
