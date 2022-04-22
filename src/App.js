import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/Navbar/navBar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Customer from "./components/Customer";
import NotFound from "./components/notFound";
import Rental from "./components/rental";
import LoginForm from "./components/loginForm";
import Register from "./components/register";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <NavBar />
          <main className="container">
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/movies" component={Movies} />
              <Route path="/customer" component={Customer} />
              <Route path="/notfound" component={NotFound} />
              <Route path="/rental" component={Rental} />
              <Route path="/register" component={Register} />
              <Route path={"/"} exact component={Movies} />
              <Redirect to="/notfound" />
            </Switch>
          </main>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
