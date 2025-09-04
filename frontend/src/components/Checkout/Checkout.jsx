import React, { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

const Checkout = () => {
  const { user } = useAuthStore();
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [useRewardPoints, setUseRewardPoints] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [pointsDiscount, setPointsDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch user points when component mounts
    if (user && user._id) {
      fetchUserPoints();
    }
  }, [user]);

  // Fetch user points from the backend
  const fetchUserPoints = async () => {
    try {
      const { data } = await axios.get(
        `${server}/order/user-points/${user._id}`
      );
      setUserPoints(data.points);
    } catch (error) {
      console.error("Error fetching user points:", error);
      toast.error("Could not fetch reward points");
    }
  };

  // Calculate points discount when reward points usage changes
  useEffect(() => {
    if (useRewardPoints && userPoints >= 1000) {
      // Convert points to BDT (100 points = 1 BDT)
      const pointsValue = Math.floor(userPoints / 100);
      setPointsDiscount(pointsValue);
    } else {
      setPointsDiscount(0);
    }
  }, [useRewardPoints, userPoints]);

  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        pointsDiscount, // Add points discount to order data
        pointsUsed: useRewardPoints ? userPoints : 0, // Track points used
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code does not exist!");
        setCouponCode("");
      }
    });
  };

  const handlePointsToggle = () => {
    if (userPoints < 1000 && !useRewardPoints) {
      toast.error("You need at least 1000 points to redeem!");
      return;
    }
    setUseRewardPoints(!useRewardPoints);
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  // Calculate total price with all discounts
  const totalPrice = (() => {
    let price = subTotalPrice + shipping;

    // Subtract coupon discount if available
    if (couponCodeData && discountPrice) {
      price -= discountPrice;
    }

    // Subtract points discount if points are being used
    if (useRewardPoints && pointsDiscount > 0) {
      price -= pointsDiscount;
    }

    return price.toFixed(2);
  })();

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
