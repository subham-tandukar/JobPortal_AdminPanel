import React from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const Pagination = ({
  page,
  pageSize,
  data,
  totalItems,
  totalPages,
  setPage,
}) => {

  const handleNext = () => {
    if (page === totalPages) {
      return page;
    } else {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page === 1) {
      return page;
    } else {
      setPage(page - 1);
    }
  };

  return (
    <div className="th-pagination">
      <div className="th-pagination-result">
        {data && data.length > 0 && (
          <>
            Showing
            {(page - 1) * pageSize + 1 ===
            (page - 1) * pageSize + data.length ? (
              ""
            ) : (
              <>
                <strong>{(page - 1) * pageSize + 1}</strong>
              </>
            )}
            to
            <strong>{(page - 1) * pageSize + data.length}</strong>
            of
            <strong>{totalItems}</strong>
            results
          </>
        )}
      </div>

      {pageSize < totalItems && (
        <div className="th-pagination-item">
          <div className="th-pagination-btn">
            <span onClick={handlePrev} className={page === 1 ? "inactive":""}>
              <MdKeyboardDoubleArrowLeft />
            </span>
          </div>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => {
              if (
                pageNumber === 1 || // Display the first page number
                pageNumber === totalPages || // Display the last page number
                (pageNumber >= page - 1 && pageNumber <= page + 1) // Display the range around the current page
              ) {
                return (
                  <div
                    className="th-pagination-btn"
                    key={pageNumber}
                    onClick={() => {
                      setPage(pageNumber);
                    }}
                  >
                    <span className={pageNumber === page ? "active" : ""}>
                      {pageNumber}
                    </span>
                  </div>
                );
              } else if (
                pageNumber === 2 &&
                page > 2 // Display the dot after the first page if necessary
              ) {
                return (
                  <div className="th-pagination-btn dots" key={pageNumber}>
                    <span>...</span>
                  </div>
                );
              } else if (
                pageNumber === totalPages - 1 &&
                page < totalPages - 1 // Display the dot before the last page if necessary
              ) {
                return (
                  <div className="th-pagination-btn dots" key={pageNumber}>
                    <span>...</span>
                  </div>
                );
              }
              return null; // Return null for pages not meeting any condition
            }
          )}

          <div className="th-pagination-btn">
            <span
              onClick={handleNext}
              className={page === totalPages ? "inactive" :""}
            >
              <MdKeyboardDoubleArrowRight />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
