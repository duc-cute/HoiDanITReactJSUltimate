/** @format */
import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./Component/Header/Header";
import PerfectScrollbar from "react-perfect-scrollbar";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="app-content">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default App;
