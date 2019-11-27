import React from "react";

const WalletItem = props => {
  const { id, code, unit, amount, purchasePrice } = props.item;
  const value = ((amount * purchasePrice) / unit).toFixed(2);
  return (
    <div className="walletItem row">
      <span>{code}</span>
      <span>{unit}</span>
      <span>{purchasePrice}</span>
      <span>{amount}</span>
      <span>{value}</span>
      <span>
        <button onClick={() => props.exchangeAction(id, "Sell")}>Sell</button>
      </span>
    </div>
  );
};

export default WalletItem;
