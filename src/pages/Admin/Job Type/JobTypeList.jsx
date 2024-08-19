import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  jobTypeList,
  updateJobTypeStatus,
  deleteJobType,
} from "../../../redux/JobType/jobTypeApi";
import { useEffect } from "react";
import { useState } from "react";
import { clearError } from "../../../redux/JobType/jobTypeSlice";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import Loading from "../../../components/Loading";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import DataTable from "../../../components/DataTable";

const JobTypeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { success, jobType, error, loading, isDeleting } = useSelector(
    (state) => state.jobType
  );

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const data = (jobType && jobType?.Values) || [];

  // ---- For Pagination -----
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (jobType && jobType.Pagination) {
      const postPagination = jobType.Pagination || "";
      // Update total number of items
      const totalItems = postPagination.Total || 0;
      setTotalItems(totalItems);

      // Calculate total number of pages based on total items and page size
      const calculatedTotalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    }
  }, [jobType]);

  // --------------------
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const dataForm = {
    FLAG: "S",
    Status: status,
    JobType: searchData,
    Page: page,
    PageSize: pageSize,
  };
  useEffect(() => {
    dispatch(jobTypeList(dataForm));
  }, [status, searchData, page, pageSize]);

  const updateStatus = (data) => {
    const dataForm = {
      FLAG: "US",
      Status: data.Status === "A" ? "I" : "A",
      JobTypeID: data._id,
    };
    dispatch(updateJobTypeStatus(dataForm));
  };

  const handleEdit = (data) => {
    navigate(`/edit-jobType/${data._id}`);
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
      JobTypeID: delId._id,
    };
    dispatch(deleteJobType(dataForm));
  };

  useEffect(() => {
    if (success) {
      toast.success("Success", {
        theme: "light",
      });

      dispatch(jobTypeList(dataForm));
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
      name: "Job Type",
      selector: (row) => row.JobType,
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
                <Tippy content="View Job Type">
                  <button>
                    <TbEye />
                  </button>
                </Tippy>
          </div> */}
          <div>
            <Tippy content="Edit Job Type">
              <button className="secondary" onClick={() => handleEdit(row)}>
                <MdOutlineEdit />
              </button>
            </Tippy>
          </div>
          <div>
            <Tippy content="Delete Job Type">
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
        title="Manage Job Type!"
        subTitle={
          data && data.length > 0 ? (
            <>{totalItems} Job Type(s)</>
          ) : (
            "No Job Type found !"
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
          title="job type"
          link
          linkRoute="/add-jobType"
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

export default JobTypeList;
