import React from "react";

const PerPage = ({ perPage, pageSize, setPageSize, setPage }) => {
  return (
  
      <div>
        <label htmlFor="">Show entries</label>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(e.target.value);
            setPage(1);
          }}
        >
          {perPage.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>
  );
};

export default PerPage;
