import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { Card } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

function Account() {
  const { user } = useContext(AuthContext);

  return (
    <Grid columns={1}>
      <Grid.Row className="page-title">
        <h1>Account</h1>
      </Grid.Row>
      <Grid.Row centered>
        <Card
          href="#card-example-link-card"
          header={user.email}
          meta="lorem"
          description="src/components/DeleteButton.js
          Line 11:11:  'loading' is assigned a value but never used  no-unused-vars
          Line 11:20:  'data' is assigned a value but never used     no-unused-vars
        
        src/pages/Account.js
          Line 1:29:   'useMemo' is defined but never used           no-unused-vars
          Line 4:16:   'Icon' is defined but never used              no-unused-vars
          Line 4:22:   'Image' is defined but never used             no-unused-vars."
        />
      </Grid.Row>
    </Grid>
  );
}

export default Account;
