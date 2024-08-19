import React from "react";
import { Link, NavLink } from "react-router-dom";

const SidebarMenu = ({ item }) => {
  return (
    <>
      {item.type === "menu-title" && (
        <li className="text-sm font-semibold text-gray-700 mt-4">
          {item.title}
        </li>
      )}

      {item.type === "menu" && (
        <li>
          <NavLink to={item.path}>
            {item.icon}
            {item.title}
          </NavLink>
        </li>
      )}
    </>
  );
};

export default SidebarMenu;
