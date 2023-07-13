/** @format */
import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postLogin } from "../../services/apiService";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { FaSpinner } from "react-icons/fa";
import Language from "../Header/Language";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid Email ");
      return;
    }

    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }

    if (data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  const handleOnkey = (e) => {
    console.log("e", e);
    console.log("key", e.key);
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="login-header  ">
        <span>Don't have an account yet?</span>
        <button
          className="btn btn-sign-up"
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
        <Language />
      </div>
      <div className="login-content  mx-auto col-4">
        <h1 className="title text-center">HoiDanIT</h1>
        <p className="description text-center">Hello Who's this?</p>
        <div className="form-login">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="duc1501@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least the 8 charaters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleOnkey(e)}
            />
          </div>
          <span>Forgot password</span>
          <button
            className="btn btn-login"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading && (
              <span>
                <FaSpinner className="loader-icon" />
              </span>
            )}
            Login to HoiDanIT
          </button>
          <div className="back">
            <span onClick={() => navigate("/")}>&#60;&#60; Go To Homepage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
