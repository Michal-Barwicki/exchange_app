import React from "react";

const CurrenciesItem = props => {
  const { id, code, unit, sellPrice } = props.item;

  return (
    <div className="currenciesItem row">
      <span>{code}</span>
      <span>{unit}</span>
      <span>{sellPrice}</span>
      <span>
        <button onClick={() => props.exchangeAction(id, "Buy")}>Buy</button>
      </span>
    </div>
  );
};

export default CurrenciesItem;
