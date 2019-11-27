import React from "react";

const Navigation = props => {
  return (
    <div className="navigation">
      <h1>Exchange</h1>
      <p>
        Logged in as <span>{props.userData.username}</span>
        <span onClick={props.logOut}>
          <i className="fas fa-door-open"></i>
        </span>
      </p>
    </div>
  );
};

export default Navigation;
