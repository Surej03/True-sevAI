import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const email = localStorage.getItem('email');  // or you can use React Context or Redux to store the email

  return (
    <Route
      {...rest}
      render={(props) =>
        email ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />  // Redirect to the email input page if email is not found
        )
      }
    />
  );
};

export default PrivateRoute;
