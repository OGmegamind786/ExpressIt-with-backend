import React from "react";
import { Route, Redirect } from "react-router-dom";
const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("SavedToken") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/users/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
