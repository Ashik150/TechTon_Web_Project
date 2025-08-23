// ... All imports and previous states
const Checkout = () => {
    // ... all previous state hooks
    const [useRewardPoints, setUseRewardPoints] = useState(false);
    const [userPoints, setUserPoints] = useState(0);
    const [pointsDiscount, setPointsDiscount] = useState(0);
    
    // ... all handlers and price calculations
    
    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <ShippingInfo /* ...props */ />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData
                        /* ...other props */
                        userPoints={userPoints}
                        pointsDiscount={pointsDiscount}
                        useRewardPoints={useRewardPoints}
                    />
                </div>
            </div>
        </div>
    );
};
// ... ShippingInfo component
const CartData = ({ /* ...other props */, userPoints, pointsDiscount, useRewardPoints }) => {
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            {/* ... subtotal, shipping, coupon discount */}
            <div className="mt-2 mb-4 border-t pt-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-[16px] font-[500] text-[#000000d4]">
                            Your Reward Points: <span className="font-[600] text-[#f63b60]">{userPoints}</span>
                        </h3>
                        <p className="text-[12px] text-[#00000094]">(100 points = 1 BDT discount)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={useRewardPoints} />
                        <div className={`w-11 h-6 bg-gray-200 ...`}></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">Use Points</span>
                    </label>
                </div>
            </div>
            {/* ... total price and coupon form */}
        </div>
    );
};
export default Checkout;