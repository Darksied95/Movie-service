import { Component } from "react";
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
}

export default Form;
