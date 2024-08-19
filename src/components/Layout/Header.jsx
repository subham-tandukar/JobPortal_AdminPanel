import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = ({ handleToggleSidebar, userInfo }) => {
  let navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div>
        {/* <div className="th-logo">
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-e089327a5c476ce5c70c74f7359c5898_screen.jpg?ts=1672291305"
            alt=""
          />
        </div> */}
        <div className="th-title">Talent Hospitality</div>
        <div
          className="block md:hidden"
          onClick={() => handleToggleSidebar(true)}
        >
          <FaBars />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="header-user">
          {/* <img
            src="https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-6.png&w=128&q=75"
            alt=""
          /> */}
          {userInfo && userInfo?.Name && userInfo?.Name.charAt(0)}
        </div>

        <div className="header-user-info text-lg leading-6 font-medium">
          {userInfo && userInfo?.Name}
          <span className="block font-normal text-gray-500 text-sm">
            {userInfo && userInfo?.Role}
          </span>
        </div>
      </div>

      {/* <div className="th-btn" onClick={handleLogout}>
        Log out
      </div> */}
    </div>
  );
};

export default Header;
