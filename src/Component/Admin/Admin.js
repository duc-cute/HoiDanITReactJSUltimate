/** @format */

import { FaBars } from "react-icons/fa";
import SideBar from "./SideBar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./Admin.scss";
import { NavDropdown } from "react-bootstrap";
import Language from "../Header/Language";
import { useTranslation } from "react-i18next";
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </span>
          <div className="admin-setting">
            <Language />
            <NavDropdown title={t("header.setting")} id="basic-nav-dropdown">
              <NavDropdown.Item>{t("header.profile")}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>{t("header.logout")}</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Admin;
