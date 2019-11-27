import React from "react";
import CurrenciesItem from "./CurrenciesItem";

const Currencies = props => {
  props.items[0].id = 0;
  props.items[1].id = 1;
  props.items[2].id = 2;
  props.items[3].id = 3;
  props.items[4].id = 4;
  props.items[5].id = 5;

  const currenciesList = props.items.map(item => (
    <CurrenciesItem
      key={item.code}
      item={item}
      exchangeAction={props.exchangeAction}
    />
  ));

  return (
    <div className="currencies">
      <h2>Currencies</h2>
      <div className="row">
        <span>Currency</span>
        <span>Unit</span>
        <span>Value</span>
        <span>Actions</span>
      </div>
      {currenciesList}
    </div>
  );
};

export default Currencies;
