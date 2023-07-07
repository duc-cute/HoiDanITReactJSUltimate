/** @format */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  // const account = useSelector((state) => state.user.account);
  // console.log("isAuthent :", isAuthenticated);
  // console.log("account :", account);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
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
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <button className="btn btn-login" onClick={handleLogin}>
                  Log In
                </button>
                <button className="btn btn-signup " onClick={handleRegister}>
                  Sign Up
                </button>
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>Log out</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
