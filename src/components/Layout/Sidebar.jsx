import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaUser } from "react-icons/fa";
import { BsSuitcaseLg } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { CiPaperplane } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineWorkHistory } from "react-icons/md";
import Popup from "../Popup";
import { GiNotebook } from "react-icons/gi";
import { PiNoteDuotone } from "react-icons/pi";
import {
  RiAdvertisementLine,
  RiPagesLine,
  RiUserSettingsLine,
} from "react-icons/ri";
import SidebarMenu from "./SidebarMenu";

const Sidebar = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
  handleClick,
  userInfo,
}) => {
  const adminMenu = [
    {
      type: "menu",
      title: "Dashboard",
      icon: <IoHomeOutline />,
      path: "/",
    },
    {
      type: "menu-title",
      title: "Users",
    },
    {
      type: "menu",
      title: "All Users",
      icon: <RiUserSettingsLine />,
      path: "/user",
    },
    {
      type: "menu-title",
      title: "Job",
    },
    {
      type: "menu",
      title: "Post a new job",
      icon: <CiPaperplane />,
      path: "/add-job",
    },
    {
      type: "menu",
      title: "manage jobs",
      icon: <BsSuitcaseLg />,
      path: "/job-list",
    },
    {
      type: "menu-title",
      title: "Applications",
    },
    {
      type: "menu",
      title: "All Applicants",
      icon: <PiNoteDuotone />,
      path: "/application",
    },
    {
      type: "menu-title",
      title: "Category",
    },
    {
      type: "menu",
      title: "Post a new category",
      icon: <CiPaperplane />,
      path: "/add-category",
    },
    {
      type: "menu",
      title: "manage category",
      icon: <BiCategory />,
      path: "/category-list",
    },

    {
      type: "menu-title",
      title: "Job Type",
    },
    {
      type: "menu",
      title: "Post a new Job Type",
      icon: <CiPaperplane />,
      path: "/add-jobType",
    },
    {
      type: "menu",
      title: "manage Job Type",
      icon: <MdOutlineWorkHistory />,
      path: "/jobType-list",
    },

    {
      type: "menu-title",
      title: "Blog",
    },
    {
      type: "menu",
      title: "Post a new Blog",
      icon: <CiPaperplane />,
      path: "/add-blog",
    },
    {
      type: "menu",
      title: "manage Blog",
      icon: <GiNotebook />,
      path: "/blog-list",
    },

    {
      type: "menu-title",
      title: "Page Manager",
    },
    {
      type: "menu",
      title: "Post a new page",
      icon: <CiPaperplane />,
      path: "/add-page",
    },
    {
      type: "menu",
      title: "manage page",
      icon: <RiPagesLine />,
      path: "/page-list",
    },

    {
      type: "menu-title",
      title: "Advertisement",
    },
    {
      type: "menu",
      title: "Post a new advertisement",
      icon: <CiPaperplane />,
      path: "/add-advertisement",
    },
    {
      type: "menu",
      title: "manage advertisement",
      icon: <RiAdvertisementLine />,
      path: "/advertisement-list",
    },
  ];

  /* This is for Admin search */

  const [searchQuery, setSearchQuery] = useState("");
  const filteredItemsForAdmin = adminMenu.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="sticky px-7 py-5 top-[-1px] left-0 z-10">
        <div className="th-form">
          <input
            type="text"
            placeholder="Search"
            className="th-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar-inner">
        <ul>
          {userInfo && userInfo.Role === "Admin" && (
            <>
              {filteredItemsForAdmin.length > 0 ? (
                filteredItemsForAdmin.map((item, index) => (
                  <SidebarMenu key={index} item={item} />
                ))
              ) : (
                <div className="th-no-data">No results found!</div>
              )}
            </>
          )}

          <li className="text-sm font-semibold text-gray-700 mt-4">Setting</li>
          <li>
            <span onClick={handleClick}>
              <AiOutlineLogout />
              Logout
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
