/** @format */

import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { i18n } = useTranslation();
  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "vi" ? "Tiếng Việt" : "English"}
        id="basic-nav-dropdown2"
        className="language"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage("en")}>
          English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage("vi")}>
          Tiếng Việt
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
