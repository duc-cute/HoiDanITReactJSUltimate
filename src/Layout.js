/** @format */

import { Route, Routes } from "react-router-dom";
// import User from "./Component/User/User";
import Admin from "./Component/Admin/Admin";
import HomePage from "./Component/HomePage/HomePage";
import ManagerUser from "./Component/Admin/Content/ManageUser";
import DashBoard from "./Component/Admin/Content/DashBoard";
import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "./App";
import ListQuiz from "./Component/User/ListQuiz";
import DetailQuiz from "./Component/User/DetailQuiz";

const NotFound = () => {
  return (
    <div className="alert alert-danger">
      404.Not Found data with current URL
    </div>
  );
};
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route path="/admin" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manager-user" element={<ManagerUser />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Layout;
