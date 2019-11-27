import React from "react";
import WalletItem from "./WalletItem";

const Wallet = props => {
  props.items[0].amount = props.userData.USD;
  props.items[1].amount = props.userData.EUR;
  props.items[2].amount = props.userData.CHF;
  props.items[3].amount = props.userData.RUB;
  props.items[4].amount = props.userData.CZK;
  props.items[5].amount = props.userData.GBP;

  props.items[0].id = 0;
  props.items[1].id = 1;
  props.items[2].id = 2;
  props.items[3].id = 3;
  props.items[4].id = 4;
  props.items[5].id = 5;

  const currenciesList = props.items.map((item, index) => (
    <WalletItem key={index} item={item} exchangeAction={props.exchangeAction} />
  ));

  return (
    <div className="wallet">
      <h2>Wallet</h2>
      <div className="row">
        <span>Currency</span>
        <span>Unit</span>
        <span>Unit price</span>
        <span>Amount</span>
        <span>Value</span>
        <span>Actions</span>
      </div>
      {currenciesList}
      <div>
        <p>
          Available PLN: <p>{props.userData.PLN}</p>
        </p>
      </div>
    </div>
  );
};

export default Wallet;
