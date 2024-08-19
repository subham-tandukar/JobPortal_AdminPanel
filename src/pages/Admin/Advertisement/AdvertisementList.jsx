import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdvertisement,
  advertisementList,
  updateAdvertisementStatus,
} from "../../../redux/Advertisement/advertisementApi";
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
import { clearError } from "../../../redux/Advertisement/advertisementSlice";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import PageHeading from "../../../components/PageHeading";
import Error from "../../../components/Error";
import DataTable from "../../../components/DataTable";

const AdvertisementList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, advertisement, error, loading, isDeleting } = useSelector(
    (state) => state.advertisement
  );

  useEffect(() => {
    dispatch(clearError());
  }, []);

  const data = (advertisement && advertisement?.Values) || [];

  // ---- For Pagination -----
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (advertisement && advertisement.Pagination) {
      const postPagination = advertisement.Pagination || "";
      // Update total number of items
      const totalItems = postPagination.Total || 0;
      setTotalItems(totalItems);

      // Calculate total number of pages based on total items and page size
      const calculatedTotalPages = Math.ceil(totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    }
  }, [advertisement]);

  // --------------------
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const dataForm = {
    FLAG: "S",
    Status: status,
    Position: searchData,
    Page: page,
    PageSize: pageSize,
  };

  useEffect(() => {
    dispatch(advertisementList(dataForm));
  }, [status, searchData, page, pageSize]);

  const updateStatus = (data) => {
    const dataForm = {
      FLAG: "US",
      Status: data.Status === "A" ? "I" : "A",
      AdvertisementID: data._id,
    };
    dispatch(updateAdvertisementStatus(dataForm));
  };

  const handleEdit = (data) => {
    navigate(`/edit-advertisement/${data._id}`);
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
      AdvertisementID: delId._id,
    };
    dispatch(deleteAdvertisement(dataForm));
  };

  useEffect(() => {
    if (success) {
      toast.success("Success", {
        theme: "light",
      });

      dispatch(advertisementList(dataForm));
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
      name: "Image",
      width: "40px",
      selector: (row) => (
        <div className="ad-logo">
          <img
            className="size-8 rounded-md object-cover"
            loading="lazy"
            src={row?.Image?.url}
            alt={row.Position}
          />
        </div>
      ),
    },
    {
      name: "Position",
      selector: (row) => row.Position,
    },
    {
      name: "Link",
      selector: (row) => (
        <Link className="draft-status" to={row.Link} target="_blank">
          {row.Link}
        </Link>
      ),
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
                <Tippy content="View Advertisement">
                  <button>
                    <TbEye />
                  </button>
                </Tippy>
          </div> */}
          <div>
            <Tippy content="Edit Advertisement">
              <button className="secondary" onClick={() => handleEdit(row)}>
                <MdOutlineEdit />
              </button>
            </Tippy>
          </div>
          <div>
            <Tippy content="Delete Advertisement">
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
        title="Manage Advertisement!"
        subTitle={
          data && data.length > 0 ? (
            <>{totalItems} Advertisement(s)</>
          ) : (
            "No Advertisement found !"
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
          title="advertisement"
          link
          linkRoute="/add-advertisement"
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
          handleClick={isDelete}
          isDeleting={isDeleting}
          title="delete"
        />
      )}
    </>
  );
};

export default AdvertisementList;
