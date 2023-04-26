import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAutheticated } from "./index";

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated() ? (
          <Element {...props} />
        ) : (
          <Navigate
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
