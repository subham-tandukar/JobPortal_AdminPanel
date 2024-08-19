import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  blogList,
  updateBlogStatus,
} from "../../../redux/Blog/blogApi";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiMapPinLine } from "react-icons/ri";
import { formattedDate } from "../../../components/hooks/hook";
import { TbEye } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { BiCategory, BiTrash } from "react-icons/bi";
import Popup from "../../../components/Popup";
import Loading from "../../../components/Loading";
import { clearError } from "../../../redux/Blog/blogSlice";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import DataTable from "../../../components/DataTable";
import { categoryList } from "../../../redux/Category/categoryApi";

const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { success, blog, error, loading, isDeleting } = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const { category } = useSelector((state) => state.category);
  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      Status: "A",
    };
    dispatch(categoryList(dataForm));
  }, []);

  const data = (blog && blog?.Values) || [];

  // ---- For Pagination -----
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (blog && blog.Pagination) {
      const postPagination = blog.Pagination || "";
      // Update total number of items
      const totalItems = postPagination.Total || 0;
      setTotalItems(totalItems);

      // Calculate total number of pages based on total items and page size
      const calculatedTotalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    }
  }, [blog]);

  // --------------------
  const [categoryData, setCategoryData] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const dataForm = {
    FLAG: "S",
    Status: status,
    Category: categoryData,
    Title: searchData,
    Page: page,
    PageSize: pageSize,
  };

  useEffect(() => {
    dispatch(blogList(dataForm));
  }, [status, categoryData, searchData, page, pageSize]);

  const updateStatus = (data) => {
    const dataForm = {
      FLAG: "US",
      Status: data.Status === "A" ? "I" : "A",
      BlogID: data._id,
    };
    dispatch(updateBlogStatus(dataForm));
  };

  const handleEdit = (data) => {
    navigate(`/edit-blog/${data._id}`);
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
      BlogID: delId._id,
    };
    dispatch(deleteBlog(dataForm));
  };

  useEffect(() => {
    if (success) {
      toast.success("Success", {
        theme: "light",
      });

      dispatch(blogList(dataForm));
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
      selector: (row) => (
        <div className="job-block">
          <div className="inner-box">
            <div className="content">
              <span className="company-logo">
                <img loading="lazy" src={row?.Image} alt={row.Title} />
              </span>
              <h4 className="!mb-0">
                <Link href="/">{row.Title}</Link>
              </h4>
              <ul className="job-info">
                <li>
                  <AiOutlineUser />
                  {row.Auther.Name}
                </li>
                <li>
                  <FaRegCalendarAlt />
                  {formattedDate(row.updatedAt)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.Category.Category,
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
                <Tippy content="View Blog">
                  <button>
                    <TbEye />
                  </button>
                </Tippy>
          </div> */}
          <div>
            <Tippy content="Edit Blog">
              <button className="secondary" onClick={() => handleEdit(row)}>
                <MdOutlineEdit />
              </button>
            </Tippy>
          </div>
          <div>
            <Tippy content="Delete Blog">
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
        title="Manage Blogs!"
        subTitle={
          data && data.length > 0 ? (
            <>{totalItems} Blog(s)</>
          ) : (
            "No blog found !"
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
          title="blog"
          link
          linkRoute="/add-blog"
          filter
          filterData={
            <>
              <div>
                <label htmlFor="">Category</label>

                <select
                  value={categoryData}
                  onChange={(e) => setCategoryData(e.target.value)}
                >
                  <option value="">All</option>
                  {category && (
                    <>
                      {category.Values &&
                        category.Values.map((item) => (
                          <option value={item._id} key={item._id}>
                            {item.Category}
                          </option>
                        ))}
                    </>
                  )}
                </select>
              </div>

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
          handleClick={isDelete}
          isDeleting={isDeleting}
          title="delete"
        />
      )}
    </>
  );
};

export default BlogList;
