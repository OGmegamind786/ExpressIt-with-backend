import React, { useState } from "react";
import "../Login.css";
import Axios from "axios";
import validator from "validator";
import { Link, useHistory } from "react-router-dom";
import backendUrl from "../config";

function Login() {
  const history = useHistory();

  const initialState = {
    email: "",
    password: "",
    errors: {},
  };

  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);
  const [errors, setErrors] = useState(initialState.errors);

  const validate = () => {
    let emailError = "";
    let passworodError = "";

    if (!validator.isEmail(email)) {
      emailError = " Invalid Email";
    }
    if (password === "") {
      passworodError = " Password cannot be empty";
    }
    if (emailError || passworodError) {
      setErrors({ ...errors, email: emailError, password: passworodError });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    const dataToSend = {
      email: email,
      password: password,
    };
    const isValid = validate();
    if (isValid) {
      setErrors({});
      try {
        const res = await Axios.post(`${backendUrl}/users/login`, dataToSend);
        let token = res.data.token;
        localStorage.setItem("SavedToken", "Bearer " + token);
        console.log(res);
        history.push("/users/me/profile");
      } catch (error) {
        alert("no such user , Check your Credentials again!");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked submit");

    handleLogin();
  };

  return (
    <div id="login">
      <div id="login-info">
        <h1 id="heading">Welcome Back to ExpressIt!</h1>
        <div>Expresso Write-Ups are waiting for you!</div>
      </div>
      <div id="form">
        <h1>
          <div className="logo">ExpressIt</div>
        </h1>
        <h2>Login Here.</h2>

        <form onSubmit={handleSubmit}>
          <div>Enter your Email:</div>
          <input
            type="email"
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <div className="text-danger">{errors.email}</div>
          <br />

          <div>Enter your password:</div>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <div className="text-danger">{errors.password}</div>
          <br />

          <input
            type="submit"
            value="Login"
            className="submit-btn"
            onClick={handleSubmit}
          />
          <div>
            Not Registered ? Click Below To Register
            <div className="link p-2 bd-highlight align-self-center">
              <Link to="/users/register">Register Now</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
