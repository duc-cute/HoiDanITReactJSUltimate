/** @format */

import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaGem } from "react-icons/fa";
import sidebarBg from "../../assets/images/bg2.jpg";

import { DiReact } from "react-icons/di";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { useTranslation } from "react-i18next";

const SideBar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  const { t } = useTranslation();

  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "pointer",
            }}
          >
            <DiReact size={"3em"} color={"00bfff"} />
            <span onClick={() => navigate("/")}>Hoi Dan IT</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              {t("sideBar.dashboard")}

              <Link to="/admin" />
            </MenuItem>
          </Menu>

          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title={t("sideBar.features")}>
              <MenuItem>
                {t("sideBar.managerUser")}
                <Link to="/admin/manager-user" />
              </MenuItem>
              <MenuItem>
                {t("sideBar.managerQuiz")}

                <Link to="/admin/manager-quizzes" />
              </MenuItem>
              <MenuItem>
                <Link to="/admin/manager-questions" />
                {t("sideBar.managerQuestions")}
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://haryphamdev.github.io/hoidanit-udemy/"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                &#169; Hỏi Dân IT Udemy
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
