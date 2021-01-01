import React from "react";
import { Link } from "react-router-dom";

const RenderAuthButton = (props) => {
  let { isLoggedIn, onClickLogout, onClickLogin, displayNone } = props;

  if (isLoggedIn) {
    return (
      <div
        className="link p-2 bd-highlight align-self-center"
        onClick={onClickLogout}
      >
        Logout
      </div>
    );
  } else {
    return (
      <div
        className="link p-2 bd-highlight align-self-center"
        onClick={onClickLogin}
        style={{ display: displayNone }}
      >
        <Link to="/users/login">Login</Link>
      </div>
    );
  }
};

export default RenderAuthButton;
