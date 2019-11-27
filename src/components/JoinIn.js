import React, { Component } from "react";

class JoinIn extends Component {
  state = {
    username: "",
    email: "",
    pass: "",
    confirm_pass: "",
    accept: false,
    message: "",
    PLN: 0,
    USD: 0,
    EUR: 0,
    CHF: 0,
    RUB: 0,
    CZK: 0,
    GBP: 0,

    errors: {
      username: false,
      email: false,
      pass: false,
      confirm_pass: false,
      accept: false
    }
  };

  messages = {
    username_incorrect:
      "Name should not contain spaces and should contain at least 3 characters.",
    email_incorrect: "Wrong email address.",
    pass_incorrect: "Password should contain at least 8 characters.",
    confirm_pass_incorrect: "Passwords are not the same.",
    accept_incorrect: "Terms are not confirmed."
  };

  handleChange = e => {
    const name = e.target.name;
    const type = e.target.type;
    if (type === "text" || type === "password" || type === "email") {
      const value = e.target.value;
      this.setState({
        [name]: value
      });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked
      });
    } else if (type === "number") {
      const value = e.target.value.replace(/\D/, "");
      this.setState({
        [name]: value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const validation = this.formValidation();

    if (validation.correct) {
      const data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.pass,
        PLN: this.state.PLN,
        USD: this.state.USD,
        EUR: this.state.EUR,
        CHF: this.state.CHF,
        RUB: this.state.RUB,
        CZK: this.state.CZK,
        GBP: this.state.GBP
      };
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      fetch("/api", options).then(response => {});

      this.setState({
        username: "",
        email: "",
        pass: "",
        confirm_pass: "",
        accept: false,
        PLN: 0,
        USD: 0,
        EUR: 0,
        CHF: 0,
        RUB: 0,
        CZK: 0,
        GBP: 0,

        message: "A form has been sent",

        errors: {
          username: false,
          email: false,
          pass: false,
          confirm_pass: false,
          accept: false
        }
      });
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
          accept: !validation.accept
        }
      });
    }
  };

  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let confirm_password = false;
    let accept = false;
    let correct = false;

    if (
      this.state.username.length >= 3 &&
      this.state.username.indexOf(" ") === -1
    ) {
      username = true;
    }
    if (this.state.email.indexOf("@") !== -1) {
      email = true;
    }
    if (this.state.pass.length >= 8) {
      password = true;
    }
    if (this.state.confirm_pass === this.state.pass) {
      confirm_password = true;
    }
    if (this.state.accept) {
      accept = true;
    }
    if (username && email && password && confirm_password && accept) {
      correct = true;
    }
    return {
      username,
      email,
      password,
      confirm_password,
      accept,
      correct
    };
  };

  componentDidUpdate() {
    if (this.state.message !== "") {
      setTimeout(
        () =>
          this.setState({
            message: ""
          }),
        2000
      );
    }
  }

  render() {
    return (
      <div className="JoinIn">
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="user">
              <span>Name:</span>
              <input
                type="text"
                id="user"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              {this.state.errors.username && (
                <div className="message">
                  {" "}
                  {this.messages.username_incorrect}{" "}
                </div>
              )}
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="email">
              <span>Email:</span>
              <input
                type="email"
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {this.state.errors.email && (
                <div className="message"> {this.messages.email_incorrect} </div>
              )}
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="password">
              <span>Password: </span>
              <input
                type="password"
                id="password"
                name="pass"
                value={this.state.pass}
                onChange={this.handleChange}
              />
              {this.state.errors.pass && (
                <div className="message"> {this.messages.pass_incorrect} </div>
              )}
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="confirm_password">
              <span>Confirm:</span>
              <input
                type="password"
                id="confirm_password"
                name="confirm_pass"
                value={this.state.confirm_pass}
                onChange={this.handleChange}
              />
              {this.state.errors.confirm_pass && (
                <div className="message">
                  {this.messages.confirm_pass_incorrect}
                </div>
              )}
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="accept">
              <input
                type="checkbox"
                id="accept"
                name="accept"
                checked={this.state.accept}
                onChange={this.handleChange}
              />
              <span className="terms">
                I confirm I have read and agree to the terms and conditions.
              </span>
              {this.state.errors.accept && (
                <div className="message">{this.messages.accept_incorrect}</div>
              )}
            </label>
          </div>

          <div className="form-row">
            <label htmlFor="PLN">
              <span>PLN:</span>
              <input
                type="number"
                id="PLN"
                name="PLN"
                min="0"
                step="1"
                value={this.state.PLN}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="USD">
              <span>USD:</span>
              <input
                type="number"
                id="USD"
                name="USD"
                min="0"
                step="1"
                value={this.state.USD}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="EUR">
              <span>EUR:</span>
              <input
                type="number"
                id="EUR"
                name="EUR"
                min="0"
                step="1"
                value={this.state.EUR}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="CHF">
              <span>CHF:</span>
              <input
                type="number"
                id="CHF"
                name="CHF"
                min="0"
                step="1"
                value={this.state.CHF}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="RUB">
              <span>RUB:</span>
              <input
                type="number"
                id="RUB"
                name="RUB"
                min="0"
                step="100"
                value={this.state.RUB}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="CZK">
              <span>CZK:</span>
              <input
                type="number"
                id="CZK"
                name="CZK"
                min="0"
                step="100"
                value={this.state.CZK}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label htmlFor="GBP">
              <span>GBP:</span>
              <input
                type="number"
                id="GBP"
                name="GBP"
                min="0"
                step="1"
                value={this.state.GBP}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <button> Sign up </button>
        </form>
        {this.state.message && <p> {this.state.message} </p>}
      </div>
    );
  }
}
export default JoinIn;
