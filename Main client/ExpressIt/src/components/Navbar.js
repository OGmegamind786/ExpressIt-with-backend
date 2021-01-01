import React, { useEffect, useState } from "react";
import "../Navbar.css";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import backendUrl from "../config";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import Axios from "axios";
import RenderAuthButton from "./RenderAuthButton";

function Navbar() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [displayNone, setDisplayNone] = useState();
  const [displayOnProfile, setDisplayOnProfile] = useState("block");
  const [displayOnFeed, setDisplayOnFeed] = useState("block");

  const currentLocation = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("SavedToken")) {
      setIsLoggedIn(false);
    }
    const toggleProfile = () => {
      if (currentLocation.pathname === "/users/me/profile") {
        setDisplayOnProfile("none");
      } else {
        setDisplayOnProfile("block");
      }
    };
    const toggleFeed = () => {
      if (currentLocation.pathname === "/users/me/feed") {
        setDisplayOnFeed("none");
      } else {
        setDisplayOnFeed("block");
      }
    };
    toggleProfile();
    toggleFeed();
  }, [currentLocation.pathname]);

  const handleLoginClick = () => {
    setDisplayNone("none");
  };

  const handleExpressItClick = () => {
    setDisplayNone("block");
  };

  const handleLogout = async () => {
    try {
      await Axios.post(
        `${backendUrl}/users/me/logout`,
        {},
        {
          headers: { Authorization: localStorage.getItem("SavedToken") },
        }
      );
      localStorage.clear("SavedToken");
      setIsLoggedIn(false);
      history.push("/users/login");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="navbar-custom d-flex bd-highlight mb-3 ">
      <div
        className="logo mr-auto p-2 bd-highlight"
        onClick={handleExpressItClick}
      >
        <Link to="/">ExpressIt</Link>
      </div>
      <div
        className="link p-2 bd-highlight align-self-center"
        style={{ display: displayOnFeed }}
      >
        <Link to="/users/me/feed">Feed</Link>
      </div>
      <div
        className="link p-2 bd-highlight align-self-center"
        style={{ display: displayOnProfile }}
      >
        <Link to="/users/me/profile">Profile</Link>
      </div>

      <RenderAuthButton
        isLoggedIn={isLoggedIn}
        onClickLogout={handleLogout}
        onClickLogin={handleLoginClick}
        displayNone={displayNone}
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}

export default Navbar;
