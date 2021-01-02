import Axios from "axios";
import React, { useState } from "react";
import validator from "validator";
import backendUrl from "../config";

import "../Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let messageError = "";

    if (name === "") {
      nameError = " name cannot be empty";
    }
    if (!validator.isEmail(email)) {
      emailError = " Invalid Email";
    }
    if (message === "") {
      messageError = " message cannot be empty";
    }

    if (nameError || emailError || messageError) {
      setErrors({
        ...errors,
        name: nameError,
        email: emailError,
        message: messageError,
      });
      return false;
    }
    return true;
  };

  const handleCreateContactForm = async () => {
    const dataToSend = {
      name: name,
      email: email,
      message: message,
    };
    const isValid = validate();
    if (isValid) {
      setErrors({});
      try {
        await Axios.post(`${backendUrl}/contactForm`, dataToSend);
        alert("Contact Form Submitted");

        window.scrollTo(0, 0);
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked submit");
    try {
      handleCreateContactForm();
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.log(errors);
    }
  };

  return (
    <div className="contact container">
        <div className="form col-md-6">
          <form onSubmit={handleSubmit}>
            <div>Name:</div>
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

            <div>Email:</div>
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

            <div>Enter your message:</div>
            <textarea
              name="message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
            />
            <div className="text-danger">{errors.message}</div>

            <br />

            <input type="submit" value="Submit" className="submit-btn" />
          </form>
        </div>

        <div className="info col-md-6">
          <h1 id="heading">Reach Out to Us</h1>
        </div>
    </div>
  );
}

export default Contact;
