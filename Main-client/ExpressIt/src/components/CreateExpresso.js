import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import backendUrl from "../config";

import "../CreateExpresso.css";

function CreateExpresso() {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Lifestyle");
  const [mainBlog, setMainBlog] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let titleError = "";
    let categoryError = "";
    let mainBlogError = "";

    if (title === "") {
      titleError = "Enter Some Title for your article";
    }
    if (category === "") {
      categoryError = "Specify the category from the list ";
    }
    if (mainBlog === "") {
      mainBlogError = "Put some words in your article";
    }

    if (titleError || categoryError || mainBlogError) {
      setErrors({
        ...errors,
        title: titleError,
        category: categoryError,
        mainBlog: mainBlogError,
      });
      return false;
    }
    return true;
  };

  const handleCreateExpresso = async () => {
    const isValid = validate();
    if (isValid) {
      setErrors({});
      try {
        const form = new FormData();
        form.append("image", image);
        form.append("title", title);
        form.append("category", category);
        form.append("mainBlog", mainBlog);

        const res = await Axios.post(
          `${backendUrl}/users/me/createExpresso`,
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
    handleCreateExpresso();
  };

  return (
    <div id="write-up">
      <div id="write-up-info">
        <h1>
          Make your own <strong>Expresso</strong> Write-Up!
        </h1>
        <p>
          Express yourself and share the experience with others in your own
          words.
        </p>
      </div>

      <div id="write-up-content">
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
          action="/users/me/createExpresso"
        >
          <div>Title of your Expresso</div>
          <input
            type="text"
            name="title"
            className="write-up-input"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <div className="text-danger">{errors.title}</div>

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

          <div>
            Category of your Expresso:
            <select
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Lifestyle">Lifestyle</option>
              <option value="Fashion">Fashion</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Fitness">Fitness</option>
              <option value="DIY">DIY</option>
              <option value="Sports">Sports</option>
              <option value="Finance">Finance</option>
              <option value="Business">Business</option>
              <option value="Personal">Personal</option>
              <option value="Movies/TV Show">Movies/TV Show</option>
              <option value="News">News</option>
              <option value="Fan Theory">Fan Theory</option>
            </select>
            <div className="text-danger">{errors.category}</div>
          </div>
          <div>Your Expresso!</div>
          <textarea
            type="text"
            name="mainBlog"
            className="article"
            onChange={(e) => {
              setMainBlog(e.target.value);
            }}
            value={mainBlog}
          />
          <div className="text-danger">{errors.mainBlog}</div>

          <br />

          <input
            type="submit"
            value="Create Expresso"
            className="submit-btn"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}

export default CreateExpresso;
