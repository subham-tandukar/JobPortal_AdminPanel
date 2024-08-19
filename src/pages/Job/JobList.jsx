import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob, jobList, updateJobStatus } from "../../redux/Job/jobApi";
import { useEffect } from "react";
import { useState } from "react";
import { clearError, isLoading } from "../../redux/Job/jobSlice";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiMapPinLine } from "react-icons/ri";
import { formattedDate } from "../../components/hooks/hook";
import { TbEye } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import Popup from "../../components/Popup";
import Loading from "../../components/Loading";
import PageHeading from "../../components/PageHeading";
import Error from "../../components/Error";
import DataTable from "../../components/DataTable";
import { categoryList } from "../../redux/Category/categoryApi";

const JobList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { userDetail } = useSelector((state) => state.auth);

  const { success, job, error, loading, isDeleting } = useSelector(
    (state) => state.job
  );
  const { category } = useSelector((state) => state.category);
  useEffect(() => {
    const dataForm = {
      FLAG: "S",
      Status: "A",
    };
    dispatch(categoryList(dataForm));
  }, []);
  const userInfo = (userDetail && userDetail?.Values) || [];

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const data = (job && job?.Values) || [];

  // ---- For Pagination -----
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (job && job.Pagination) {
      const postPagination = job.Pagination || "";
      // Update total number of items
      const totalItems = postPagination.Total || 0;
      setTotalItems(totalItems);

      // Calculate total number of pages based on total items and page size
      const calculatedTotalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    }
  }, [job]);

  // --------------------
  const [categoryData, setCategoryData] = useState("");
  const [published, setPublished] = useState("");
  const [featured, setFeatured] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const dataForm = {
    FLAG: "S",
    UserID: userInfo && userInfo.Id,
    Category: categoryData,
    IsPublished: published,
    IsFeatured: featured,
    JobDesignation: searchData,
    Page: page,
    PageSize: pageSize,
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(jobList({ data: dataForm, token: currentUser.Token }));
    }
  }, [userInfo, categoryData, published, featured, searchData, page, pageSize]);

  const updateStatus = (data, update) => {
    const dataForm = {
      FLAG: "US",
      Update: update === "Publish" ? "Publish" : "Feature",
      IsPublished:
        update === "Publish" ? (data.IsPublished === "Y" ? "N" : "Y") : "",
      IsFeatured:
        update === "Feature" ? (data.IsFeatured === "Y" ? "N" : "Y") : "",
      JobID: data._id,
    };
    dispatch(updateJobStatus({ data: dataForm, token: currentUser.Token }));
  };

  const handleEdit = (data) => {
    navigate(`/edit-job/${data._id}`);
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
      JobID: delId._id,
    };
    dispatch(deleteJob({ data: dataForm, token: currentUser.Token }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Success", {
        theme: "light",
      });

      dispatch(jobList({ data: dataForm, token: currentUser.Token }));
      dispatch(clearError());
      setShowModal(false);
    }
  }, [success]);

  const handleSingleApplication = (data) => {
    navigate(`/single-application/${data._id}`);
  };

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
                <img
                  loading="lazy"
                  src={
                    row?.ComLogo
                      ? row?.ComLogo
                      : "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305"
                  }
                  alt={row.ComName}
                />
              </span>
              <div>
                <h4 className="flex items-center">
                  <Link href="/">{row.JobDesignation}</Link>
                  <span
                    className={`th-badge ml-2 ${
                      row.IsExpired === "Y"
                        ? "danger"
                        : row.ExpiresIn === "Today"
                        ? "success"
                        : ""
                    }`}
                  >
                    {row.IsExpired === "Y"
                      ? "Expired"
                      : `Expires ${row.ExpiresIn === "Today" ? "" : "in"} ${
                          row.ExpiresIn
                        }`}
                  </span>
                </h4>
              </div>
              <ul className="job-info">
                <li>
                  <IoBriefcaseOutline />
                  {row.JobType.JobType}
                </li>
                <li>
                  <RiMapPinLine />
                  {row.Location}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "No. of applications",
      width: "100px",
      center: true,
      selector: (row) => (
        <>
          {row.NoOfApplications > 0 ? (
            <Tippy content="View Application">
              <span
                className="applied-status"
                onClick={() => handleSingleApplication(row)}
              >
                {row.NoOfApplications} Applied
              </span>
            </Tippy>
          ) : (
            <span>Haven't applied</span>
          )}
        </>
      ),
    },
    {
      name: "Featured",
      width: "100px",
      center: true,
      selector: (row) => (
        <Tippy
          content={
            row.IsFeatured === "Y" ? "Click to unfeature" : "Click to feature"
          }
        >
          <span
            onClick={() => updateStatus(row, "Feature")}
            className={`${
              row.IsFeatured === "Y" ? "active-status" : "inactive-status"
            }`}
          >
            {row.IsFeatured === "Y" ? "Featured" : "Unfeatured"}
          </span>
        </Tippy>
      ),
    },
    {
      name: "Status",
      width: "100px",
      center: true,
      selector: (row) => (
        <Tippy
          content={
            row.IsPublished === "Y" ? "Click to draft" : "Click to publish"
          }
        >
          <span
            onClick={() => updateStatus(row, "Publish")}
            className={`${
              row.IsPublished === "Y" ? "publish-status" : "draft-status"
            }`}
          >
            {row.IsPublished === "Y" ? "Published" : "Draft"}
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
                <Tippy content="View Job">
                  <button>
                    <TbEye />
                  </button>
                </Tippy>
          </div> */}
          <div>
            <Tippy content="Edit Job">
              <button className="secondary" onClick={() => handleEdit(row)}>
                <MdOutlineEdit />
              </button>
            </Tippy>
          </div>
          <div>
            <Tippy content="Delete Job">
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
        title="Manage jobs!"
        subTitle={
          data && data.length > 0 ? <>{totalItems} Job(s)</> : "No Job found !"
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
          title="job"
          link
          linkRoute="/add-job"
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
                <label htmlFor="">Featured</label>

                <select
                  value={featured}
                  onChange={(e) => setFeatured(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Y">Featured</option>
                  <option value="N">Unfeatured</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Status</label>

                <select
                  value={published}
                  onChange={(e) => setPublished(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Y">Published</option>
                  <option value="N">Draft</option>
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

export default JobList;
