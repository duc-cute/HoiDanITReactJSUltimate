/** @format */
import { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiService";
import { AiOutlineEye, AiFillEyeInvisible } from "react-icons/ai";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleRegister = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid Email ");
      return;
    }
    if (!password) {
      toast.error("Invalid Password ");
      return;
    }

    let data = await postRegister(email, password, userName);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }

    if (data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="register-container">
      <div className="register-header  ">
        <span>Already have an account ?</span>
        <button className="btn btn-login" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
      <div className="register-content  mx-auto col-4">
        <h1 className="title text-center">HoiDanIT </h1>
        <p className="description text-center">Start your journey?</p>
        <div className="form-register">
          <div className="form-group">
            <label>Email(*)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password(*)</label>
            <input
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isShowPassword ? (
              <span onClick={() => setIsShowPassword(false)}>
                <AiOutlineEye />
              </span>
            ) : (
              <span onClick={() => setIsShowPassword(true)}>
                <AiFillEyeInvisible />
              </span>
            )}
          </div>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <button className="btn btn-register" onClick={handleRegister}>
            Create my free account
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
