import React from "react";
import { Tab } from "semantic-ui-react";

import Products from "./Products";
import Account from "./Account";
import { useHistory } from "react-router";

function Home(props) {
  const { match } = props;
  const { params } = match;
  const { active_tab } = params;
  const history = useHistory();

  const tabsNameToIndex = {
    0: "account",
    1: "products",
    2: "contact",
  };

  const tabsIndexToName = {
    account: 0,
    products: 1,
    contact: 2,
  };

  const panes = [
    {
      menuItem: "Account",
      render: () => (
        <Tab.Pane>
          <Account />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Products",
      render: () => (
        <Tab.Pane>
          <Products />
        </Tab.Pane>
      ),
    },
    { menuItem: "Contact", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ];

  const handleChange = (e, data) => {
    history.push(`/home/${tabsNameToIndex[data.activeIndex]}`);
  };

  return (
    <>
      <Tab
        panes={panes}
        onTabChange={handleChange}
        defaultActiveIndex={tabsIndexToName[active_tab]}
      />
      {/* <Segment tertiary>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </Segment> */}
    </>
  );
}

export default Home;
