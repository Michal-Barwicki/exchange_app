import React, { Component } from "react";

class LogIn extends Component {
  state = {
    email: "",
    pass: ""
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      email: "",
      pass: ""
    });
  };

  render() {
    return (
      <div className="LogIn">
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="email">
              <span>Email:</span>
              <input
                type="email"
                id="email_log"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="password">
              <span>Password:</span>
              <input
                type="password"
                id="password_log"
                name="pass"
                value={this.state.pass}
                onChange={this.handleChange}
              />
            </label>
          </div>

          <button
            onClick={() =>
              this.props.changePermission(this.state.email, this.state.pass)
            }
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}
export default LogIn;
