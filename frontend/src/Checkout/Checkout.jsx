// ... All imports remain the same
import React, { useState } from "react";
// ...
const Checkout = () => {
  const { user } = useAuthStore();
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  
  // ... price calculation ...
  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
  const shipping = subTotalPrice * 0.1;
  const totalPrice = (subTotalPrice + shipping).toFixed(2);
  
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user} country={country} setCountry={setCountry} city={city} setCity={setCity}
            userInfo={userInfo} setUserInfo={setUserInfo} address1={address1} setAddress1={setAddress1}
            address2={address2} setAddress2={setAddress2} zipCode={zipCode} setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData subTotalPrice={subTotalPrice} shipping={shipping} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({ user, country, setCountry, city, setCity, userInfo, setUserInfo, address1, setAddress1, address2, setAddress2, zipCode, setZipCode }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      {/* ... form fields */}
      <h5 className="text-[18px] cursor-pointer inline-block" onClick={() => setUserInfo(!userInfo)}>
        Choose From saved address
      </h5>
      {userInfo && (
        <div>
          {user && user.addresses.map((item, index) => (
            <div className="w-full flex mt-1" key={index}>
              <input
                type="checkbox"
                className="mr-3"
                checked={selectedAddress === item.addressType}
                value={item.addressType}
                onClick={() =>
                  setSelectedAddress(item.addressType) || setAddress1(item.address1) ||
                  setAddress2(item.address2) || setZipCode(item.zipCode) ||
                  setCountry(item.country) || setCity(item.city)
                }
              />
              <h2>{item.addressType}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
// ... CartData component remains the same
const CartData = ({ subTotalPrice, shipping, totalPrice }) => { /* ... */ };
export default Checkout;