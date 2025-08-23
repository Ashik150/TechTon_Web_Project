import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);

  return (
    // ... (Cart component JSX remains unchanged)
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenCart(false)} />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenCart(false)} />
              </div>
              <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">{cart && cart.length} items</h5>
              </div>
              <br />
              <div className="w-full border-t">
                {cart && cart.map((i, index) => (
                  <CartSingle key={index} data={i} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock - 1 < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div onClick={() => increment(data)} className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}>
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span> {/* Display local state value */}
          <div onClick={() => decrement(data)} className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img src={`${data?.images[0]?.url}`} alt="" className="w-[130px] h-min ml-2 mr-2 rounded-[5px]" />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            BDT{data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            BDT {totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Cart;