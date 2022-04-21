import React from "react";
import Input from "./input";
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
    const { data, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={data.username}
          onChange={this.handleChange}
          error={this.state.errors.username}
        />
        <Input
          name="password"
          label="Password"
          value={data.password}
          onChange={this.handleChange}
          error={errors.password}
        />
        <button className="btn btn-primary" disabled={this.validate()}>
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
