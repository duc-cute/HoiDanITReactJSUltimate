/** @format */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation } from "react-i18next";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    //Clear data redux
    navigate("/register");
  };

  const handleLogout = async () => {
    console.log("account", account);
    const res = await logout(account.email, account.refresh_token);
    console.log("res", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      dispatch(doLogout());

      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className="navbar-brand">
          Hỏi Dân IT
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              {t("header.home")}
            </NavLink>
            <NavLink to="/users" className="nav-link">
              {t("header.user")}
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              {t("header.admin")}
            </NavLink>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <button className="btn btn-login" onClick={handleLogin}>
                  {t("header.login")}
                </button>
                <button className="btn btn-signup " onClick={handleRegister}>
                  {t("header.signup")}
                </button>
              </>
            ) : (
              <NavDropdown title={t("header.setting")} id="basic-nav-dropdown">
                <NavDropdown.Item>{t("header.profile")}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLogout()}>
                  {t("header.logout")}
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
