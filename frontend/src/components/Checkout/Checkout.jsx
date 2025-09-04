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

