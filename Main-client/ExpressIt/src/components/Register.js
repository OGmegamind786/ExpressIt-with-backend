import React, { useState } from "react";
import "../Register.css";
import Axios from "axios";
import validator from "validator";
import { useHistory } from "react-router-dom";
import backendUrl from "../config";

function Register() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let passworodError = "";
    let conPassworodError = "";
    let passDontMatch = "";

    if (!validator.isEmail(email)) {
      emailError = " Invalid Email";
    }

    if (name === "") {
      nameError = " name cannot be empty";
    }

    if (password === "") {
      passworodError = " Password cannot be empty";
    }

    if (conPassword === "") {
      conPassworodError = " Password cannot be empty";
    }

    if (password !== conPassword) {
      passDontMatch = " Passwords dont match";
    }
    if (
      emailError ||
      nameError ||
      passworodError ||
      conPassworodError ||
      passDontMatch
    ) {
      setErrors({
        ...errors,
        name: nameError,
        email: emailError,
        password: passworodError,
        conPassword: conPassworodError,
        passDontMatch: passDontMatch,
      });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    const dataToSend = {
      name: name,
      email: email,
      password: password,
      conPassword: conPassword,
    };

    const isValid = validate();
    if (isValid) {
      setErrors({});
      try {
        const res = await Axios.post(
          `${backendUrl}/users/register`,
          dataToSend
        );
        console.log(res);
        history.push("/users/login");
      } catch ({ err }) {
        alert(err);
        console.log(err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked submit");

    console.log(errors);
    handleRegister();
  };
  return (
    <div>
      <div id="register">
        <div id="register-info">
          <h1 id="heading">Welcome to ExpressIt!</h1>
          <div>
            Fasten up your seatbelts and get ready to enjoy the ride of fun
            Expresso Write-Ups!
          </div>
        </div>
        <div id="form-register">
          <h1>
            <div className="logo">ExpressIt</div>
          </h1>
          <h2> Registration </h2>
          <form onSubmit={handleSubmit}>
            <div>Enter your Name:</div>
            <input
              type="text"
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <div className="text-danger">{errors.name}</div>

            <br />

            <div>Enter your Email:</div>
            <input
              type="email"
              name="mail"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <div className="text-danger">{errors.email}</div>

            <br />

            <div>Set your password:</div>
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

            <div>Confirm your password:</div>
            <input
              type="password"
              name="conPassword"
              onChange={(e) => {
                setConPassword(e.target.value);
              }}
              value={conPassword}
            />
            <div className="text-danger">{errors.conPassword}</div>

            <div className="text-danger">{errors.passDontMatch}</div>
            <br />

            <input
              type="submit"
              value="Register"
              className="submit-btn"
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
