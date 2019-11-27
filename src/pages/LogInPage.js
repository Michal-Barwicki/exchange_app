import React from "react";
import JoinIn from "../components/JoinIn";
import LogIn from "../components/LogIn";
import "./LogInPage.scss";

const LogInPage = props => {
  return (
    <div className="LogInPage">
      <JoinIn></JoinIn>
      <LogIn changePermission={props.changePermission}></LogIn>
    </div>
  );
};

export default LogInPage;
