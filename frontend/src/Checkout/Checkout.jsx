import React from "react";
import styles from "../../styles/styles";

const Checkout = () => {
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <h1>Shipping Info</h1>
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <h1>Cart Data</h1>
        </div>
      </div>
    </div>
  );
};

export default Checkout;