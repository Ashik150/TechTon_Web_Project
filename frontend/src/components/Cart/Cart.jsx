import React from "react";

const Cart = ({ setOpenCart }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <h1>Cart is empty!</h1>
      </div>
    </div>
  );
};

export default Cart;