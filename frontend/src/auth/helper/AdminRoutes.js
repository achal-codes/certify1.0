import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAutheticated } from "./index";

const AdminRoute = ({element : Element, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated() && isAutheticated().user.role === 1 ? (
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

export default AdminRoute;
