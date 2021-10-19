import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { Message } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

function ProtectedRoute({ component: Component, ...rest }) {
  const MessageExampleMessage = () => (
    <Message negative size="huge">
      <Message.Header>Authorization Request</Message.Header>
      <p>Please, you need to login to have access to this page.</p>
    </Message>
  );
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <MessageExampleMessage /> : <Component {...props} />
      }
    />
  );
}

export default ProtectedRoute;
