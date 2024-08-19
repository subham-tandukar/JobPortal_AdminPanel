import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Toast from "../Toast";
import Popup from "../Popup";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/User/userSlice";
import Sidebar from "./Sidebar";
import { baseURL } from "../hooks/hook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isSignOut } from "../../redux/Auth/authSlice";

const Layout = (props) => {
  const { userDetail } = useSelector((state) => state.auth);

  const userInfo = (userDetail && userDetail?.Values) || [];

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const dispatch = useDispatch();
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  const [showModal, setShowModal] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const handleClick = (data) => {
    setShowModal(true);
  };

  const logout = async () => {
    try {
      setIsLogout(true);
      await fetch(`${baseURL}/api/signOut`);
      setTimeout(() => {
        dispatch(signOut());
        dispatch(isSignOut());
        toast.success("Logout sucessful", {
          theme: "light",
        });
        if (userInfo && userInfo.Role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);
    } catch (error) {
      setIsLogout(false);
    }
  };
  return (
    <>
      <header className="fixed w-full top-0 left-0 z-50 bg-white p-4 px-10 border border-b-[#ecedf2]  border-solid shadow-th-shadow ">
        <Header userInfo={userInfo} handleToggleSidebar={handleToggleSidebar} />
      </header>
      <main className={`app ${toggled ? "toggled" : ""}`}>
        <aside>
          <div
            className={`${
              !collapsed ? "min-w-[300px]" : "min-w-[80px]"
            } th-sidebar pt-[78px]`}
          >
            <Sidebar
              userInfo={userInfo}
              collapsed={collapsed}
              toggled={toggled}
              handleToggleSidebar={handleToggleSidebar}
              handleCollapsedChange={handleCollapsedChange}
              handleClick={handleClick}
            />
          </div>
        </aside>

        <article
          style={{
            transition: "all 0.3s linear",
          }}
          className={` ${
            !collapsed ? "pl-[300px]" : "pl-[80px]"
          }   min-h-screen flex flex-col pt-[78px]`}
        >
          <section className="th-main-content flex-1">
            <div>{props.children}</div>
          </section>
        </article>
      </main>

      {showModal && (
        <Popup
          setShowModal={setShowModal}
          handleClick={logout}
          isDeleting={isLogout}
          title="logout"
        />
      )}
    </>
  );
};

export default Layout;
