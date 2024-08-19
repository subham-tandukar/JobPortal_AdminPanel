import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./App.css";

import ErrorPage from "./components/ErrorPage";
import ScrollToTop from "./components/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import JobList from "./pages/Job/JobList";
import AddJob from "./pages/Job/AddJob";
import EditJob from "./pages/Job/EditJob";
import AddCategory from "./pages/Admin/Category/AddCategory";
import CategoryList from "./pages/Admin/Category/CategoryList";
import EditCategory from "./pages/Admin/Category/EditCategory";
import Login from "./pages/Login/Login";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import AddJobType from "./pages/Admin/Job Type/AddJobType";
import JobTypeList from "./pages/Admin/Job Type/JobTypeList";
import EditJobType from "./pages/Admin/Job Type/EditJobType";
import Toast from "./components/Toast";
import AddBlog from "./pages/Admin/Blog/AddBlog";
import BlogList from "./pages/Admin/Blog/BlogList";
import EditBlog from "./pages/Admin/Blog/EditBlog";
import AddPage from "./pages/Admin/Page/AddPage";
import PageList from "./pages/Admin/Page/PageList";
import EditPage from "./pages/Admin/Page/EditPage";
import { userInfo } from "./redux/Auth/authApi";
import ApplicationList from "./pages/Application/ApplicationList";
import SingleApplication from "./pages/Application/SingleApplication";
import AddAdvertisement from "./pages/Admin/Advertisement/AddAdvertisement";
import AdvertisementList from "./pages/Admin/Advertisement/AdvertisementList";
import EditAdvertisement from "./pages/Admin/Advertisement/EditAdvertisement";
import UserList from "./pages/Admin/User/UserList";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(userInfo(currentUser.Token));
    }
  }, [currentUser]);

  return (
    <>
      <Toast />
      {!currentUser && (
        <Routes>
          {" "}
          {/* <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} /> */}
          <Route path="*" element={<AdminLogin />} />
          <Route path="/" element={<AdminLogin />} />
        </Routes>
      )}

      {currentUser && ( // Render Layout only if currentUser is truthy
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" index={true} element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />

            <Route path="/user" element={<UserList />} />

            <Route path="/job-list" element={<JobList />} />
            <Route path="/add-job" element={<AddJob />} />
            <Route path="/edit-job/:id" element={<EditJob />} />

            <Route path="/application" element={<ApplicationList />} />
            <Route
              path="/single-application/:id"
              element={<SingleApplication />}
            />

            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/category-list" element={<CategoryList />} />
            <Route path="/edit-category/:id" element={<EditCategory />} />

            <Route path="/add-jobType" element={<AddJobType />} />
            <Route path="/jobType-list" element={<JobTypeList />} />
            <Route path="/edit-jobType/:id" element={<EditJobType />} />

            <Route path="/add-blog" element={<AddBlog />} />
            <Route path="/blog-list" element={<BlogList />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />

            <Route path="/add-page" element={<AddPage />} />
            <Route path="/page-list" element={<PageList />} />
            <Route path="/edit-page/:id" element={<EditPage />} />

            <Route path="/add-advertisement" element={<AddAdvertisement />} />
            <Route path="/advertisement-list" element={<AdvertisementList />} />
            <Route path="/edit-advertisement/:id" element={<EditAdvertisement />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default App;
