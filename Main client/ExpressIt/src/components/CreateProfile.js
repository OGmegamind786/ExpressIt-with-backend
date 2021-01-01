import Axios from "axios";
import React, { useEffect, useState } from "react";
import "../CreateProfile.css";
import { useHistory } from "react-router-dom";
import backendUrl from "../config";

function CreateProfile() {
  const history = useHistory();
  const [data, setData] = useState({});

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`${backendUrl}/users/me/profile`, {
        headers: { Authorization: localStorage.getItem("SavedToken") },
      });
      setData(res.data);
      setName(res.data.name);
      setAge(res.data.age);
      setAbout(res.data.userDescription);
    };
    fetchData();
  }, []);

  const validate = () => {
    let nameError = "";
    let ageError = "";
    let aboutError = "";

    if (name === "") {
      nameError = " name cannot be empty";
    }

    if (age === "") {
      ageError = " age cannot be empty";
    } else if (isNaN(age)) {
      ageError = "age should be a number";
    }

    if (about === "") {
      aboutError = " Field cannot be empty";
    }

    if (nameError || ageError || aboutError) {
      setErrors({
        ...errors,
        name: nameError,
        age: ageError,
        about: aboutError,
      });
      return false;
    }
    return true;
  };

  const handleCreateProfile = async () => {
    const dataToSend = {
      name: name,
      age: age,
      userDescription: about,
    };
    const isValid = validate();
    if (isValid) {
      setErrors({});
      try {
        const form = new FormData();
        form.append("name", name);
        form.append("age", age);
        form.append("userDescription", about);
        form.append("image", image);
        const res = await Axios.post(
          "http://localhost:3012/users/me/createProfile",
          form,
          {
            headers: { Authorization: localStorage.getItem("SavedToken") },
          }
        );
        history.push("/users/me/profile");
        console.log(res);
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked submit");
    handleCreateProfile();
  };
  return (
    <div id="create-profile">
      <h1>
        Create Your <strong>ExpressIt</strong> Profile
      </h1>
      <p>We would like to know you better. Tell us about yourself.</p>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="post"
        action="users/me/createProfile"
      >
        <div>What is your Name?</div>
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
        <div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>

        <br />

        <div>How old are you?</div>
        <input
          type="number"
          name="age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
          value={age}
        />
        <div className="text-danger">{errors.age}</div>

        <br />

        <div>Describe yourself in short</div>
        <textarea
          type="text"
          name="about"
          onChange={(e) => {
            setAbout(e.target.value);
          }}
          value={about}
        />
        <div className="text-danger">{errors.about}</div>

        <br />

        <input
          type="submit"
          value="Create Profile"
          className="submit-btn"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}

export default CreateProfile;
