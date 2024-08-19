import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, userList } from "../../../redux/User/userApi";
import { useEffect } from "react";
import { useState } from "react";
import { clearError } from "../../../redux/User/userSlice";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";
import { Link, useNavigate } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiMapPinLine } from "react-icons/ri";
import { TbEye } from "react-icons/tb";
import { MdOutlineEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import Popup from "../../../components/Popup";
import Loading from "../../../components/Loading";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import { GoDotFill } from "react-icons/go";
import { GrFormCheckmark, GrFormClose } from "react-icons/gr";
import { jobList } from "../../../redux/Job/jobApi";
import { app } from "../../../firebase";
import { ref, deleteObject, getStorage } from "firebase/storage";
import { timeAgo } from "../../../components/hooks/hook";
import DataTable from "../../../components/DataTable";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetail } = useSelector((state) => state.auth);

  const { success, user, error, loading, isDeleting } = useSelector(
    (state) => state.user
  );
  const userInfo = (userDetail && userDetail?.Values) || [];

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const data = (user && user?.Values) || [];

  // ---- For Pagination -----
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (user && user.Pagination) {
      const postPagination = user.Pagination || "";
      // Update total number of items
      const totalItems = postPagination.Total || 0;
      setTotalItems(totalItems);

      // Calculate total number of pages based on total items and page size
      const calculatedTotalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    }
  }, [user]);

  // --------------------
  const [role, setRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const dataForm = {
    FLAG: "S",
    Role: role,
    Name: searchData,
    Page: page,
    PageSize: pageSize,
  };

  useEffect(() => {
    dispatch(userList(dataForm));
  }, [role, searchData, page, pageSize]);

  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState("");

  const handleDelete = (data) => {
    setShowModal(true);
    setDelId(data);
  };

  const isDelete = async () => {
    const dataForm = {
      FLAG: "D",
      UserID: delId._id,
    };
    dispatch(deleteUser(dataForm));
  };

  useEffect(() => {
    if (success) {
      toast.success("Success", {
        theme: "light",
      });

      dispatch(userList(dataForm));

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
      name: "Name",
      selector: (row) => (
        <>
          {row.Name}
          {userInfo && userInfo?.Id === row._id && (
            <span className="th-badge">you</span>
          )}
        </>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.Email,
    },
    {
      name: "Role",
      width: "130px",
      selector: (row) => row.Role,
    },
    {
      name: "Last Logged In",
      selector: (row) => (
        <span className="th-status th-pending">
          <GoDotFill />
          {timeAgo(row.LastLoggedIn)}
        </span>
      ),
    },

    {
      name: "Action",
      width: "130px",
      center: true,
      selector: (row) => (
        <div className="th-cta-btns">
          <Tippy content="Delete User">
            <button
              className="danger"
              onClick={() => handleDelete(row)}
              disabled={userInfo && userInfo?.Id === row._id}
            >
              <BiTrash />
            </button>
          </Tippy>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeading
        title="All Users!"
        subTitle={
          user && user.Values && user.Values.length > 0 ? (
            <>
              {user.Values.length}{" "}
              {role === "A"
                ? "Admin User(s)"
                : role === "E"
                ? "Employee(s)"
                : role === "C"
                ? "Candidate(s)"
                : "User(s)"}
            </>
          ) : (
            "No User found !"
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
          title="user"
          filter
          filterData={
            <div>
              <label htmlFor="">Users</label>

              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">All Users</option>
                <option value="Admin">Admin</option>
                <option value="Employer">Employer</option>
                <option value="Candidate">Candidate</option>
              </select>
            </div>
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

export default UserList;
