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
import ManageQuiz from "./Component/Admin/Content/Quiz/ManageQuiz";
import Questions from "./Component/Admin/Content/Questions/Questions";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from "react";

const NotFound = () => {
  return (
    <div className="alert alert-danger">
      404.Not Found data with current URL
    </div>
  );
};
const Layout = () => {
  return (
    <Suspense fallback="...is loading">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <ListQuiz />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="manager-user" element={<ManagerUser />} />
          <Route path="manager-quizzes" element={<ManageQuiz />} />
          <Route path="manager-questions" element={<Questions />} />
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
    </Suspense>
  );
};

export default Layout;
