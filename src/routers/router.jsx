import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { Home } from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import { DashboardLayout } from "../Dashboard/DashboardLayout";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Login from "../pages/Login";
import SingleBook from "../pages/shared/SingleBook";
import UploadBook from "../Dashboard/UploadBook";
import Dashboard from "../Dashboard/Dashboard";
import EditBooks from "../Dashboard/EditBooks";
import Signup from "../pages/Signup";
import Logout from "../pages/Logout";
import ErrorPage from "../pages/shared/ErrorPage";
import About from "../pages/about/About";
import Blog from "../pages/blog/Blog";
import Favorite from "../Dashboard/Favorite";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/book/:id" element={<SingleBook />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Route>
      <Route path="/admin/dashboard" element={<DashboardLayout />}>
        <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="upload" element={<UploadBook />} />
        <Route path="favorite" element={<PrivateRoute><Favorite /></PrivateRoute>} />
        <Route path="edit-books/:id" element={<EditBooks />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/create-user" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
