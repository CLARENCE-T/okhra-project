import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SingleProduct from "./pages/SingleProduct";
import ProtectedRoute from "./util/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Switch>
            <Redirect exact from="/" to="/home/account" />
            <Redirect exact from="/home" to="/home/account" />
            <ProtectedRoute path="/home/:active_tab?" component={Home} />
          </Switch>
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/products/:productId" component={SingleProduct} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
