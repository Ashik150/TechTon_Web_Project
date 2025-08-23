import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    // ... Cart JSX ...
     <div className="w-full border-t">
        {cart &&
          cart.map((i, index) => (
            <CartSingle
              key={index}
              data={i}
              quantityChangeHandler={quantityChangeHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))}
      </div>
    // ...
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock - 1 < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    // ... CartSingle JSX ...
    // onClick for +/- buttons now correctly points to increment/decrement
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div className={`...`} onClick={() => increment(data)}>
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{data.qty}</span> {/* Now shows Redux state qty */}
          <div className="..." onClick={() => decrement(data)}>
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        {/* ... rest of JSX */}
      </div>
    </div>
  );
};

export default Cart;