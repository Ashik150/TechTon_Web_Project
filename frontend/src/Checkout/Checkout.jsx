import React, { useState } from "react";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { useAuthStore } from "../../store/authStore";

const Checkout = () => {
  const { user } = useAuthStore();
  const { cart } = useSelector((state) => state.cart);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);

  // ... (price calculation logic remains the same)
  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
  const shipping = subTotalPrice * 0.1;
  const totalPrice = (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
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

const ShippingInfo = ({ user, address1, setAddress1, address2, setAddress2, zipCode, setZipCode }) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        {/* ... (Full Name, Email, Phone Number inputs) */}
        <div className="w-full flex pb-3">
            <div className="w-[50%]">
                <label className="block pb-2">Phone Number</label>
                <input type="number" value={user && user.phoneNumber} required className={`${styles.input} !w-[95%]`} />
            </div>
            <div className="w-[50%]">
                <label className="block pb-2">Zip Code</label>
                <input type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required className={`${styles.input}`} />
            </div>
        </div>
        <div className="w-full flex pb-3">
            <div className="w-[50%]">
                <label className="block pb-2">Address1</label>
                <input type="address" value={address1} onChange={(e) => setAddress1(e.target.value)} required className={`${styles.input} !w-[95%]`} />
            </div>
            <div className="w-[50%]">
                <label className="block pb-2">Address2</label>
                <input type="address" value={address2} onChange={(e) => setAddress2(e.target.value)} required className={`${styles.input}`} />
            </div>
        </div>
      </form>
    </div>
  );
};

// ... CartData component remains the same
const CartData = ({ subTotalPrice, shipping, totalPrice }) => { /* ... */ };
export default Checkout;