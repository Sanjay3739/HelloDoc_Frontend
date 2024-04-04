import React, { useState } from "react";
import Avatar from "../svg/avatar.svg";
import "../RegisterForm/register.scss";
import Mobile from "../svg/mobile.svg";
import { useNavigate } from "react-router-dom";
import { RegisterApi } from "../../../services/AuthApi/register";
import { useTranslation } from "react-i18next";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<any>({});
  const { t } = useTranslation();

  const handleLogin = () => {
    navigate("/");
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!userName.trim()) {
      newErrors.userName = ["UserName is required"];
    }

    if (!email.trim()) {
      newErrors.email = ["Email is required"];
    }

    if (!phone.trim()) {
      newErrors.phone = ["Phone Number is required"];
    }

    if (!password.trim()) {
      newErrors.password = ["Password is required"];
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await RegisterApi(userName, email, password, phone);
      } catch (error: any) {
        setErrors(error.message);
      }
    }
  };
  return (
    <>
      <div className="register-container">
        <div className="form-content">
          <form onSubmit={handleSubmit} className="auth_form">
            <img className="avatar" src={Avatar} title="image" />
            <h2 className="title">{t("register.welcome")}</h2>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  title="userName"
                  name="userName"
                  className={`pl-10 pr-4 py-2 border ${
                    errors.userName ? "border-red-500" : "border-gray-300"
                  } form_input input-width`}
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <div className="absolute svg-box left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user h-5 w-5 text-gray-400"></i>
                </div>
              </div>
              {errors.userName && (
                <p className="text-red-500 text-xs mt-1 flex">
                  {errors.userName[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`pl-10 pr-4 py-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } form_input input-width`}
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute svg-box left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope h-5 w-5 text-gray-400"></i>
                </div>
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex">
                  {errors.email[0]}
                </p>
              )}{" "}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="number"
                  title="phone"
                  name="phone"
                  className={`pl-10 pr-4 py-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } form_input input-width`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Your Mobile Number"
                />
                <div className="absolute svg-box left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-mobile-alt h-5 w-5 text-gray-400"></i>
                </div>
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 flex">
                  {errors.phone[0]}
                </p>
              )}{" "}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`pl-10 pr-4 py-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } form_input input-width`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute svg-box left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock h-5 w-5 text-gray-400"></i>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex">
                  {errors.password[0]}
                </p>
              )}{" "}
            </div>
            <a className="login_link" href="#" onClick={handleLogin}>
              {t("register.loginHere")}
            </a>
            <input type="submit" className="submit_btn" value="Register" />
            <div className="card-info">
              <p>
                {t("register.desc1")} <a href="#">{t("register.terms")} </a>
              </p>
            </div>
          </form>
        </div>
        <div className="img ">
          <span className="signIn sign-info">
            {t("register.SignUp")}
            <br />
            <span className="let_us">
              {" "}
              {t("register.getStarted")} <br /> {t("register.accountCreate")}
            </span>
          </span>
          <img className="background-img" src={Mobile} title="image" />
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
