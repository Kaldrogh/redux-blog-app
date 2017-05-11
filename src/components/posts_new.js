import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createPost } from "../actions";
import _ from "lodash";

const FIELDS = {
  title: {
    type: "input",
    minLength: 3,
    label: "Title"
  },
  categories: {
    type: "input",
    minLength: 3,
    label: "Categories"
  },
  content: {
    type: "textarea",
    minLength: 20,
    label: "Article Content"
  }
};

class PostsNew extends Component {
  renderFields() {
    return _.map(FIELDS, (value, key) => {
      return <Field name={key} component={this.renderField} label={value.label} />
    });
  }
  renderField(field) {
    const { meta: { visited, error }, input: { name }, label } = field;
    const i = FIELDS[name];
    const formGroupClass = `form-group ${visited ? (error ? "has-danger" : "has-success") : ""}`;
    const formControlClass = `form-control ${visited ? (error ? "form-control-danger" : "form-control-success") : ""}`;
    const textHelper = `Type at least ${name === "title" || name === "categories" ? "3" : "20"} characters`;

    return (
      <div className={formGroupClass}>
        <label className="form-control-label" for={name}>
          {label}
        </label>
        <i.type
          className={formControlClass}
          type="text"
          id={name}
          {...field.input}
        />
        {visited
          ? <div className="form-control-feedback">
              {error ? error : "Ok!"}
            </div>
          : ""}
        <small className="form-text text-muted">
          {textHelper}
        </small>
      </div>
    );
  }
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/">
            Back to Index
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            {this.renderFields()}
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link className="btn btn-danger" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}!`;
    } else if (values[field].length < type.minLength) {
      errors[field] = `Your ${field} should be at least ${type.minLength} characters long.`;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm"
})(connect(null, { createPost })(PostsNew));
