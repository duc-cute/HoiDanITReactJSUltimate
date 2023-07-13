/** @format */
import { useSelector } from "react-redux";
import videoHomePage from "../../assets/video/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <h1 className="heading-page">{t("homePage.title")}</h1>
        <p className="heading-description">{t("homePage.description")}</p>
        <div className="heading-getstarted">
          {isAuthenticated ? (
            <button onClick={() => navigate("/users")}>
              {t("homePage.getStartedUser")}
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>
              {t("homePage.getStarted")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
