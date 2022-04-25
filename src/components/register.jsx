import React from "react";
import Form from "./form";
import Joi from "joi-browser";

class Register extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().email().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("email", "Email", "email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default Register;
