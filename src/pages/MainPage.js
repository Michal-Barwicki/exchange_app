import React, { Component } from "react";
import Navigation from "../components/Navigation";
import Currencies from "../components/Currencies";
import Wallet from "../components/Wallet";
import "./MainPage.scss";

class MainPage extends Component {
  state = {};

  render() {
    return (
      <div className="MainPage">
        <Navigation
          userData={this.props.userData}
          currenciesData={this.props.currenciesData}
          logOut={this.props.logOut}
        ></Navigation>
        <main>
          {Object.keys(this.props.currenciesData).length == 0 ? (
            ""
          ) : (
            <Currencies
              items={this.props.currenciesData.items}
              exchangeAction={this.props.exchangeAction}
            ></Currencies>
          )}
          {Object.keys(this.props.currenciesData).length == 0 ? (
            ""
          ) : (
            <Wallet
              items={this.props.currenciesData.items}
              userData={this.props.userData}
              exchangeAction={this.props.exchangeAction}
            ></Wallet>
          )}
        </main>
      </div>
    );
  }
}

export default MainPage;
