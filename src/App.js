import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import MainPage from "./pages/MainPage";
import Popup from "./components/Popup";
import "./App.scss";

class App extends Component {
  state = {
    permission: false,
    currenciesData: {},
    popupVisible: false,
    userAction: {
      index: "",
      action: ""
    },
    userData: {}
  };

  async getCurrencies() {
    setInterval(async () => {
      const response = await fetch("/currencies");
      const json = await response.json();
      this.setState({
        currenciesData: json
      });
    }, 1000);
  }

  componentDidMount() {
    this.getCurrencies();
    console.log(this.state.currenciesData);
  }

  changePermission = async (email, password) => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    };
    const response = await fetch("/users", options);
    const data = await response.json();
    if (data && Object.keys(data).length > 0) {
      this.setState({
        permission: true,
        userData: data
      });
    }
  };

  exchangeAction = (index, action) => {
    this.setState({
      popupVisible: true,
      userAction: {
        index,
        action
      }
    });
  };

  closePopup = () => {
    this.setState({
      popupVisible: false
    });
  };

  exchange = (value, code, amount) => {
    if (
      this.state.userAction.action == "Buy" &&
      value <= this.state.userData.PLN
    ) {
      this.setState(prevState => ({
        userData: {
          ...prevState.userData,
          PLN: Number(prevState.userData.PLN) - Number(value),
          [code]: Number(prevState.userData[code]) + Number(amount)
        }
      }));
    } else if (
      this.state.userAction.action == "Sell" &&
      amount <= this.state.userData[code]
    ) {
      this.setState(prevState => ({
        userData: {
          ...prevState.userData,
          PLN: Number(prevState.userData.PLN) + Number(value),
          [code]: Number(prevState.userData[code]) - Number(amount)
        }
      }));
    } else {
      alert("You don't have enough funds");
    }
  };

  logOut = async () => {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...this.state.userData
      })
    };
    const response = await fetch("/userData", options);
    const data = await response.json();
    this.setState({
      permission: false
    });
  };

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <LogInPage
                  {...props}
                  changePermission={this.changePermission}
                />
              )}
            />
            <Route
              path="/mainPage"
              render={props => (
                <MainPage
                  {...props}
                  userData={this.state.userData}
                  currenciesData={this.state.currenciesData}
                  exchangeAction={this.exchangeAction}
                  logOut={this.logOut}
                />
              )}
            />
          </Switch>
          <Route
            render={() =>
              this.state.permission ? (
                <Redirect to="/mainPage" />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Router>
        {this.state.popupVisible ? (
          <Popup
            userData={this.state.userData}
            currenciesData={this.state.currenciesData}
            userAction={this.state.userAction}
            closePopup={this.closePopup}
            exchange={this.exchange}
          ></Popup>
        ) : (
          ""
        )}
      </>
    );
  }
}
export default App;
