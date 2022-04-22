import React from "react";
import Form from "./form";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  afterSubmit = () => {
    //call server
    console.log("Submitted");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.handleInput("username", "Username")}
        {this.handleInput("password", "Password", "password")}
        {this.handleButton("Login")}
      </form>
    );
  }
}

export default LoginForm;
