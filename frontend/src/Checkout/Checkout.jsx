import React, { useState } from "react";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { useAuthStore } from "../../store/authStore";

const Checkout = () => {
  const { user } = useAuthStore();
  const { cart } = useSelector((state) => state.cart);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.1;
  const totalPrice = (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo user={user} />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            subTotalPrice={subTotalPrice}
            shipping={shipping}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({ user }) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input type="text" value={user && user.name} required className={`${styles.input} !w-[95%]`} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input type="email" value={user && user.email} required className={`${styles.input}`} />
          </div>
        </div>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input type="number" value={user && user.phoneNumber} required className={`${styles.input} !w-[95%]`} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input type="number" required className={`${styles.input}`} />
          </div>
        </div>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input type="address" required className={`${styles.input} !w-[95%]`} />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input type="address" required className={`${styles.input}`} />
          </div>
        </div>
      </form>
    </div>
  );
};

const CartData = ({ subTotalPrice, shipping, totalPrice }) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">{subTotalPrice} BDT</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">{shipping.toFixed(2)} BDT</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">- 0 BDT</h5>
      </div>
      <div className="flex justify-between border-t pt-3">
        <h3 className="text-[16px] font-[500] text-[#000000a4]">Total:</h3>
        <h5 className="text-[18px] font-[600]">{totalPrice} BDT</h5>
      </div>
    </div>
  );
};

export default Checkout;