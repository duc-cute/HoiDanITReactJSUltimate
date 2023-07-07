/** @format */
import { useSelector } from "react-redux";
import videoHomePage from "../../assets/video/video-homepage.mp4";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <h1 className="heading-page">There's a better way to ask</h1>
        <p className="heading-description">
          You don't want to make a boring form. and your audience won't answer
          one.Create a typeform instead-and make everyone happy
        </p>
        <div className="heading-getstarted">
          {isAuthenticated ? (
            <button onClick={() => navigate("/users")}>Doing Quiz Now</button>
          ) : (
            <button onClick={() => navigate("/login")}>
              Get started - it's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
