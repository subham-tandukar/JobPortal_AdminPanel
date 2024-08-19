import React from "react";
import Pagination from "./Pagination";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import PerPage from "./PerPage";
import Search from "./Search";

const DataTable = ({
  columns,
  data,
  loading,
  pagination = false,
  paginationData,
  search = false,
  searchData,
  title,
  link = false,
  linkRoute,
  filter = false,
  filterData,
}) => {
  const {
    perPage,
    page,
    pageSize,
    totalItems,
    totalPages,
    setPage,
    setPageSize,
  } = pagination && paginationData;

  const { searchTerm, setSearchTerm, setSearchData } = search && searchData;

  return (
    <>
      <div className="th-table-header">
        <div>
          <div className="th-filter">
            {filter && filterData}

            {data && data.length > 0 && pagination && (
              <PerPage
                perPage={perPage}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            )}
          </div>
        </div>
        <div>
          {search && (
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSearchData={setSearchData}
              setPage={pagination ? setPage : () => {}}
            />
          )}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          {data && data.length > 0 ? (
            <div className="th-table overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    {columns.length > 0 &&
                      columns.map((colItem, i) => (
                        <th
                          className={`${
                            colItem?.center
                              ? "text-center"
                              : colItem?.right
                              ? "text-right"
                              : "text-left"
                          }
                         
                          `}
                          key={colItem.name}
                          style={{
                            width: colItem?.width ? colItem?.width : "",
                          }}
                        >
                          {colItem.name}
                        </th>
                      ))}
                  </tr>
                </thead>

                <tbody>
                  {data.length > 0 &&
                    data.map((item, i) => (
                      <tr key={item._id}>
                        {columns.length > 0 &&
                          columns.map((colItem) => (
                            <td
                              className={`${
                                colItem?.center
                                  ? "text-center"
                                  : colItem?.right
                                  ? "text-right"
                                  : "text-left"
                              }
                              ${
                                colItem?.width
                                  ? "w-[" + colItem?.width + "]"
                                  : ""
                              }
                              `}
                              key={colItem.name}
                            >
                              {colItem.selector(item, i)}
                            </td>
                          ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="th-no-data">
              No {title} available
              {link && <Link to={linkRoute}>Add new {title}</Link>}
            </div>
          )}
        </>
      )}

      {pagination && (
        <Pagination
          data={data}
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          totalPages={totalPages}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default DataTable;
