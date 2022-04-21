import React from "react";

const Input = ({ name, label, value, onChange, error }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
