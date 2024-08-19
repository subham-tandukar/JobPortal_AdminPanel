import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteApplication,
  applicationList,
  updateJobStatus,
  updateApplication,
} from "../../redux/Application/applicationApi";
import { useEffect } from "react";
import { useState } from "react";
import {
  clearError,
  isLoading,
} from "../../redux/Application/applicationSlice";
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
import { GoDotFill } from "react-icons/go";
import { GrFormCheckmark, GrFormClose } from "react-icons/gr";
import { jobList } from "../../redux/Job/jobApi";
import DataTable from "../../components/DataTable";

const ApplicationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { userDetail } = useSelector((state) => state.auth);

  const { success, application, error, loading, isDeleting } = useSelector(
    (state) => state.application
  );
  const { job } = useSelector((state) => state.job);
  const userInfo = (userDetail && userDetail?.Values) || [];

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const data = (application && application?.Values) || [];

  // ---- For Pagination -----
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (application && application.Pagination) {
      const postPagination = application.Pagination || "";
      // Update total number of items
      const totalItems = postPagination.Total || 0;
      setTotalItems(totalItems);

      // Calculate total number of pages based on total items and page size
      const calculatedTotalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    }
  }, [application]);

  // --------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");

  const [jobStatus, setJobStatus] = useState("");
  const [jobDesignation, setJobDesignation] = useState("");

  const query = `JobStatus=${jobStatus}&JobDesignation=${jobDesignation}&Name=${searchData}`;
  useEffect(() => {
    if (userInfo) {
      dispatch(applicationList({ data: query, token: currentUser.Token }));
    }
  }, [userInfo, jobStatus, jobDesignation, searchData, page, pageSize]);

  const dataForm = {
    FLAG: "S",
    UserID: userInfo && userInfo.Id,
    Category: "",
  };
  useEffect(() => {
    if (userInfo) {
      dispatch(jobList({ data: dataForm, token: currentUser.Token }));
    }
  }, [userInfo]);

  const [showModal, setShowModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [delId, setDelId] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const handleDelete = (data) => {
    setShowModal(true);
    setDelId(data);
  };

  const isDelete = async () => {
    const dataForm = {
      FLAG: "D",
      ApplicationID: delId._id,
    };
    dispatch(deleteApplication({ data: dataForm, token: currentUser.Token }));
  };

  const handleStatus = (data, status) => {
    setShowStatusModal(true);
    setDelId(data);
    setUpdateStatus(status);
  };

  const isStatus = () => {
    const dataForm = {
      FLAG: "US",
      ApplicationID: delId._id,
      JobStatus: updateStatus,
    };
    dispatch(updateApplication({ data: dataForm, token: currentUser.Token }));
  };

  useEffect(() => {
    if (success) {
      toast.success("Success", {
        theme: "light",
      });

      dispatch(applicationList({ data: query, token: currentUser.Token }));

      dispatch(clearError());
      setShowModal(false);
      setShowStatusModal(false);
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
      name: "Name",
      selector: (row) => row.Name,
    },
    {
      name: "Email",
      width: "130px",
      selector: (row) => row.Email,
    },
    {
      name: "Phone Number",
      width: "130px",
      selector: (row) => row.PhoneNumber,
    },
    {
      name: "Applied for",
      selector: (row) => row.Job,
    },
    {
      name: "CV",
      width: "70px",
      center: true,
      selector: (row) => (
        <Link to={row.CV} target="_blank">
          <div className="th-cta-btns">
            <Tippy content="View CV">
              <button>
                <TbEye />
              </button>
            </Tippy>
          </div>
        </Link>
      ),
    },
    {
      name: "Status",
      width: "70px",
      center: true,
      selector: (row) => (
        <>
          {row.JobStatus === "P" ? (
            <span className="th-status th-pending">
              <GoDotFill />
              Pending
            </span>
          ) : row.JobStatus === "A" ? (
            <span className="th-status th-approved">
              <GrFormCheckmark /> Approved
            </span>
          ) : (
            <span className="th-status th-rejected">
              <GrFormClose /> Rejected
            </span>
          )}
        </>
      ),
    },
    {
      name: "Action",
      width: "130px",
      center: true,
      selector: (row) => (
        <div className="th-cta-btns">
          {row.JobStatus === "P" && (
            <>
              <div>
                <Tippy content="Approve Application">
                  <button
                    className="success"
                    onClick={() => handleStatus(row, "A")}
                  >
                    <GrFormCheckmark />
                  </button>
                </Tippy>
              </div>
              <div>
                <Tippy content="Reject Application">
                  <button
                    className="secondary"
                    onClick={() => handleStatus(row, "R")}
                  >
                    <GrFormClose />
                  </button>
                </Tippy>
              </div>
            </>
          )}

          <div>
            <Tippy content="Delete Application">
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
        title="All Applicants!"
        subTitle={
          data && data.length > 0 ? (
            <>{totalItems} Applicant(s)</>
          ) : (
            "No Applicant found !"
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
          title="application"
          filter
          filterData={
            <>
              <div>
                <label htmlFor="">Jobs</label>
                <select
                  value={jobDesignation}
                  onChange={(e) => setJobDesignation(e.target.value)}
                >
                  <option value="">All</option>
                  {job &&
                    job.Values &&
                    job.Values.length > 0 &&
                    job.Values.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.JobDesignation}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <label htmlFor="">Status</label>

                <select
                  value={jobStatus}
                  onChange={(e) => setJobStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="A">Approved</option>
                  <option value="P">Pending</option>
                  <option value="R">Rejected</option>
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
      {showStatusModal && (
        <Popup
          setShowModal={setShowStatusModal}
          handleClick={isStatus}
          isDeleting={isDeleting}
          title={updateStatus === "A" ? "Approve" : "Reject"}
        />
      )}
    </>
  );
};

export default ApplicationList;
