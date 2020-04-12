import React, { Component } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/user_action";
import { connect } from "react-redux";
class Register extends Component {
  state = {
    lastname: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  };

  displayErrors = (errors) => {
    return errors.map((err, i) => (
      <p className="red-text" key={i}>
        {err}
      </p>
    ));
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isFormEmpty = ({ lastname, name, email, password, passwordConfirmation }) => {
    return (
      !name.length ||
      !lastname.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (
      password.toString().length > 6 ||
      passwordConfirmation.toString().length > 6
    ) {
      return false;
    } else if (password.toString() !== passwordConfirmation.toString()) {
      return false;
    } else {
      return true;
    }
  };
  isFormvalid = () => {
    let error;

    if (this.isFormEmpty(this.state)) {
      error = "Fill in all fields!";
      this.setState({
        errors: this.state.errors.concat(error),
      });
    } else if (this.isPasswordValid(this.state)) {
      error = "Password is invalid!";
      this.setState({
        errors: this.state.errors.concat(error),
      });
    } else {
      return true;
    }
  };

  submitForm = (event) => {
    event.preventDefault();

    const dataToSubmit = {
      email: this.state.email,
      lastname: this.state.lastname,
      name: this.state.name,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
    };
    //console.log(dataToSubmit);

    if (this.isFormvalid()) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          //console.log(response);
          if (response.payload.sucess) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: this.state.errors.concat(
                "your attempt to send data to db failed"
              ),
            });
          }
        })
        .catch((err) => {
          this.setState({
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      console.log("form not valid");
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Register</h2>
        <div className="row">
          <form
            className="col s12" /*onSubmit={(event) => this.submitForm(event)}*/
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                  id="lastname"
                  type="text"
                  className="validate"
                />
                <label className="active" htmlFor="lastname">
                  Last Name
                </label>
                <span
                  className="helper-text"
                  data-error="Please enter a valid email"
                  data-sucess="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  id="name"
                  type="text"
                  className="validate"
                />
                <label className="active" htmlFor="name">
                  Name
                </label>
                <span
                  className="helper-text"
                  data-error="Name weird"
                  data-sucess="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  id="email"
                  type="email"
                  className="validate"
                />
                <label className="active" htmlFor="email">
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error="Please enter a valid password"
                  data-sucess="right"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  id="password"
                  type="password"
                  className="validate"
                />
                <label className="active" htmlFor="password">
                  Password
                </label>
                <span
                  className="helper-text"
                  data-error="Please enter a valid password"
                  data-sucess="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="passwordConfirmation"
                  value={this.state.passwordConfirmation}
                  onChange={this.handleChange}
                  id="passwordConfirmation"
                  type="password"
                  className="validate"
                />
                <label className="active" htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>
                <span
                  className="helper-text"
                  data-error="Please enter a valid confirmation password"
                  data-sucess="right"
                />
              </div>
            </div>

            {this.state.errors.length > 0 ? (
              <div>{this.displayErrors(this.state.errors)}</div>
            ) : null}

            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Create an Account
                </button>
                &nbsp;&nbsp;
                <Link to="/login">
                  <button
                    className="btn waves-effect red lighten-2"
                    type="submit"
                    name="action"
                  >
                    Log in
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Register);
