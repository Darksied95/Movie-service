import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    let option = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, option);

    if (!result.error) return 0;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateOnChange = ({ name, value }) => {
    const schema = { [name]: this.schema[name] };
    const labelToBeValidated = { [name]: value };
    const { error } = Joi.validate(labelToBeValidated, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
  };

  handleChange = ({ currentTarget }) => {
    let account = { ...this.state.account };
    account[currentTarget.name] = currentTarget.value;
    const error = this.validateOnChange(currentTarget);
    const errors = { [currentTarget.name]: error };
    this.setState({ account, errors });
  };
  render() {
    const { account, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          onChange={this.handleChange}
          error={this.state.errors.username}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
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
