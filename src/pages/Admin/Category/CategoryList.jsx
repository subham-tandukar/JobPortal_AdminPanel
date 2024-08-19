import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  updateCategoryStatus,
  deleteCategory,
} from "../../../redux/Category/categoryApi";
import { useEffect } from "react";
import { useState } from "react";
import { clearError } from "../../../redux/Category/categorySlice";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import { useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import Search from "../../../components/Search";
import PerPage from "../../../components/PerPage";
import DataTable from "../../../components/DataTable";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { success, category, error, loading, isDeleting } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const data = (category && category?.Values) || [];

  // ---- For Pagination -----
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (category && category.Pagination) {
      const postPagination = category.Pagination || "";
      // Update total number of items
      const totalItems = postPagination.Total || 0;
      setTotalItems(totalItems);

      // Calculate total number of pages based on total items and page size
      const calculatedTotalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    }
  }, [category]);

  // --------------------
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const dataForm = {
    FLAG: "S",
    Status: status,
    Category: searchData,
    Page: page,
    PageSize: pageSize,
  };

  useEffect(() => {
    dispatch(categoryList(dataForm));
  }, [status, searchData, page, pageSize]);

  const updateStatus = (data) => {
    const dataForm = {
      FLAG: "US",
      Status: data.Status === "A" ? "I" : "A",
      CategoryID: data._id,
    };
    dispatch(updateCategoryStatus(dataForm));
  };

  const handleEdit = (data) => {
    navigate(`/edit-category/${data._id}`);
  };

  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState("");
  const handleDelete = (data) => {
    setShowModal(true);
    setDelId(data);
  };

  const isDelete = () => {
    const dataForm = {
      FLAG: "D",
      CategoryID: delId._id,
    };
    dispatch(deleteCategory(dataForm));
  };

  useEffect(() => {
    if (success) {
      toast.success("Success", {
        theme: "light",
      });

      dispatch(categoryList(dataForm));
      dispatch(clearError());
      setShowModal(false);
    }
  }, [success]);

  // For Data Table ------------
  const columns = [
    {
      name: "S.N.",
      width: "30px",
      center: true,
      selector: (row, index) => (page - 1) * pageSize + index + 1,
    },
    {
      name: "Category",
      selector: (row) => row.Category,
    },
    {
      name: "Status",
      width: "130px",
      center: true,
      selector: (row) => (
        <Tippy
          content={
            row.Status === "A" ? "Click to deactivate" : "Click to activate"
          }
        >
          <span
            onClick={() => updateStatus(row)}
            className={`${
              row.Status === "A" ? "active-status" : "inactive-status"
            }`}
          >
            {row.Status === "A" ? "Active" : "Inactive"}
          </span>
        </Tippy>
      ),
    },
    {
      name: "Action",
      width: "130px",
      center: true,
      selector: (row) => (
        <div className="th-cta-btns">
          {/* <div>
                <Tippy content="View Category">
                  <button>
                    <TbEye />
                  </button>
                </Tippy>
          </div> */}
          <div>
            <Tippy content="Edit Category">
              <button className="secondary" onClick={() => handleEdit(row)}>
                <MdOutlineEdit />
              </button>
            </Tippy>
          </div>
          <div>
            <Tippy content="Delete Category">
              <button className="danger" onClick={() => handleDelete(row)}>
                <BiTrash />
              </button>
            </Tippy>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeading
        title="Manage Category!"
        subTitle={
          data && data.length > 0 ? (
            <>{totalItems} Category(s)</>
          ) : (
            "No Category found !"
          )
        }
      />
      <Error error={error} />

      <div className="th-card mt-5">
        <DataTable
          columns={columns}
          data={data}
          loading={loading}
          pagination
          paginationData={{
            perPage: [5, 10, 15, 20],
            page,
            pageSize,
            totalItems,
            totalPages,
            setPage,
            setPageSize,
          }}
          search
          searchData={{
            searchTerm,
            setSearchTerm,
            setSearchData,
          }}
          title="category"
          link
          linkRoute="/add-category"
          filter
          filterData={
            <>
              <div>
                <label htmlFor="">Status</label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="A">Active</option>
                  <option value="I">Inactive</option>
                </select>
              </div>
            </>
          }
        />
      </div>

      {showModal && (
        <Popup
          setShowModal={setShowModal}
          isDeleting={isDeleting}
          handleClick={isDelete}
          title="delete"
        />
      )}
    </>
  );
};

export default CategoryList;
