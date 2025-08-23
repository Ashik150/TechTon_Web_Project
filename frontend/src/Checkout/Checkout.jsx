import React, { useState, useEffect } from "react";
// ... all other imports
const Checkout = () => {
  // ... all states
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user && user._id) { fetchUserPoints(); }
  }, [user]);

  const fetchUserPoints = async () => { /* ... API call logic */ };

  useEffect(() => {
    if (useRewardPoints && userPoints >= 1000) {
      const pointsValue = Math.floor(userPoints / 100);
      setPointsDiscount(pointsValue);
    } else {
      setPointsDiscount(0);
    }
  }, [useRewardPoints, userPoints]);

  const handlePointsToggle = () => {
    if (userPoints < 1000 && !useRewardPoints) {
      toast.error("You need at least 1000 points to redeem!");
      return;
    }
    setUseRewardPoints(!useRewardPoints);
  };
  
  const totalPrice = (() => {
    let price = subTotalPrice + shipping - (discountPrice || 0);
    if (useRewardPoints && pointsDiscount > 0) {
      price -= pointsDiscount;
    }
    return price.toFixed(2);
  })();

  return (
    // ... JSX with props passed to CartData
    <CartData
        /* ... other props */
        handlePointsToggle={handlePointsToggle}
    />
  );
};
// ... ShippingInfo component
const CartData = ({ /* ... props */, handlePointsToggle }) => {
    return(
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            {/* ... other data */}
            <input type="checkbox" onChange={handlePointsToggle} disabled={userPoints < 1000} />
            {/* ... points display logic */}
            {useRewardPoints && pointsDiscount > 0 && (
              <div className="flex justify-between mt-2">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">Points Discount:</h3>
                <h5 className="text-[18px] font-[600] text-[#f63b60]">- {pointsDiscount} BDT</h5>
              </div>
            )}
            {/* ... */}
        </div>
    )
}
export default Checkout;