import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useSelector } from "react-redux";
import { useAuthStore } from "../../store/authStore";

const Checkout = () => {
  const { user } = useAuthStore();
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  
  // ... price calculation
  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
  const shipping = subTotalPrice * 0.1;
  const totalPrice = (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user} country={country} setCountry={setCountry} city={city} setCity={setCity}
            address1={address1} setAddress1={setAddress1} address2={address2} setAddress2={setAddress2}
            zipCode={zipCode} setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData subTotalPrice={subTotalPrice} shipping={shipping} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({ user, country, setCountry, city, setCity, address1, setAddress1, address2, setAddress2, zipCode, setZipCode }) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        {/* ... Other inputs */}
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Choose your country</option>
              {Country && Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">City</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Choose your City</option>
              {State && State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* ... Address inputs */}
      </form>
    </div>
  );
};

// ... CartData component remains the same
const CartData = ({ subTotalPrice, shipping, totalPrice }) => { /* ... */ };
export default Checkout;