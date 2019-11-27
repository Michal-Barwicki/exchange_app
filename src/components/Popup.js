import React, { Component } from "react";
import "./Popup.scss";
class Popup extends Component {
  state = {
    amount: "",
    value: 0,
    code: ""
  };

  handleChange = e => {
    const {
      unit,
      sellPrice,
      purchasePrice,
      code
    } = this.props.currenciesData.items[this.props.userAction.index];
    let amount = e.target.value;
    amount = Math.abs(Math.floor(amount));
    let value = "";
    if (this.props.userAction.action == "Buy") {
      value = ((amount * sellPrice) / unit).toFixed(2);
    } else if (this.props.userAction.action == "Sell") {
      value = ((amount * purchasePrice) / unit).toFixed(2);
    }

    this.setState({
      amount,
      value,
      code
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.exchange(this.state.value, this.state.code, this.state.amount);
    this.props.closePopup();
  };

  render() {
    const {
      unit,
      sellPrice,
      purchasePrice,
      code
    } = this.props.currenciesData.items[this.props.userAction.index];
    let value = "";
    if (this.props.userAction.action == "Buy") {
      value = ((this.state.amount * sellPrice) / unit).toFixed(2);
    } else {
      value = ((this.state.amount * purchasePrice) / unit).toFixed(2);
    }
    return (
      <div className="overlay">
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="popup">
            <label htmlFor="currency">
              <p>{this.props.userAction.action}: </p>
              <input
                type="number"
                name="currency"
                value={this.state.amount}
                onChange={this.handleChange}
              />
            </label>
            <p>{code} </p>
            for <span>{this.state.value} PLN</span>
            <button className="confirm">Confirm</button>
            <button className="close" onClick={this.props.closePopup}>
              x
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Popup;
