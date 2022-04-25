import { Component } from "react";
import Input from "./input";
import Select from "./Select";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    error: {},
  };
  validate = () => {
    let option = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, option);

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
  handleChange = ({ currentTarget }) => {
    let data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    const error = this.validateOnChange(currentTarget);
    const errors = { [currentTarget.name]: error };
    this.setState({ data, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });

    this.afterSubmit();
  };
  afterSubmit = () => {
    console.log("Submitted");
    //Call server
    this.doSubmit();
  };
  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }
  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
