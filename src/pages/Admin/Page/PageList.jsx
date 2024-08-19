import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageList, deletePage } from "../../../redux/Page/pageApi";
import { useEffect } from "react";
import { useState } from "react";
import { clearError } from "../../../redux/Page/pageSlice";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import Loading from "../../../components/Loading";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import { formattedDate } from "../../../components/hooks/hook";
import DataTable from "../../../components/DataTable";

const PageList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { success, pageData, error, loading, isDeleting } = useSelector(
    (state) => state.page
  );

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const data = (pageData && pageData?.Values) || [];

  // ---- For Pagination -----
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (pageData && pageData.Pagination) {
      const postPagination = pageData.Pagination || "";
      // Update total number of items
      const totalItems = postPagination.Total || 0;
      setTotalItems(totalItems);

      // Calculate total number of pages based on total items and page size
      const calculatedTotalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    }
  }, [pageData]);

  // --------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const dataForm = {
    FLAG: "S",
    Title: searchData,
    Page: page,
    PageSize: pageSize,
  };

  useEffect(() => {
    dispatch(pageList(dataForm));
  }, [searchData, page, pageSize]);

  const handleEdit = (data) => {
    navigate(`/edit-page/${data._id}`);
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
      PageID: delId._id,
    };
    dispatch(deletePage(dataForm));
  };

  useEffect(() => {
    if (success) {
      toast.success("Success", {
        theme: "light",
      });

      dispatch(pageList(dataForm));
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
      name: "Title",
      selector: (row) => row.Title,
    },
    {
      name: "Created At",
      width: "150px",
      center: true,
      selector: (row) => formattedDate(row.updatedAt),
    },
    {
      name: "Action",
      width: "130px",
      center: true,
      selector: (row) => (
        <div className="th-cta-btns">
          {/* <div>
                <Tippy content="View Page">
                  <button>
                    <TbEye />
                  </button>
                </Tippy>
          </div> */}
          <div>
            <Tippy content="Edit Page">
              <button className="secondary" onClick={() => handleEdit(row)}>
                <MdOutlineEdit />
              </button>
            </Tippy>
          </div>
          <div>
            <Tippy content="Delete Page">
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
        title="Manage Page!"
        subTitle={
          data && data.length > 0 ? (
            <>{totalItems} Page(s)</>
          ) : (
            "No page found !"
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
          title="page"
          link
          linkRoute="/add-page"
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

export default PageList;
