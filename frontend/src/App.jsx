import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/floatingShape";
import React, { useState } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ShopCreatePage from "./pages/ShopCreatePage";
import SellerActivationPage from "./pages/SellerActivationPage";
import ShopHomePage from "./pages/Shop/ShopHomePage";
import ShopLoginPage from "./pages/ShopLoginPage.jsx";
import ProfilePage from "./pages/ProfilePage";
import ShopDashboardPage from "./pages/Shop/ShopDashboardPage";
import ShopCreateProduct from "./pages/Shop/ShopCreateProduct";
import ShopAllProducts from "./pages/Shop/ShopAllProducts";
import ShopCreateEvents from "./pages/Shop/ShopCreateEvents";
import ShopAllEvents from "./pages/Shop/ShopAllEvents";
import ShopAllCoupons from "./pages/Shop/ShopAllCoupons";
import ShopPreviewPage from "./pages/Shop/ShopPreviewPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import ShopAllOrders from "./pages/Shop/ShopAllOrders";
import ShopOrderDetails from "./pages/Shop/ShopOrderDetails.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import TrackOrderPage from "./pages/TrackOrderPage.jsx";
import ShopAllRefunds from "./pages/Shop/ShopAllRefunds.jsx";
import ShopSettingsPage from "./pages/Shop/ShopSettingsPage.jsx";
import ShopInboxPage from "./pages/Shop/ShopInboxPage.jsx";


import LoadingSpinner from "./components/LoadingSpinner";
import Loader from "./components/Layout/Loader";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import BestSellingPage from "./pages/BestSellingPage";
import EventsPage from "./pages/EventsPage";
import FAQPage from "./pages/FAQPage";
import { server } from "./server";
import { loadSeller, loadUser } from "./redux/actions/user";
import Store from "./redux/store";
import { useSelector } from "react-redux";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { get } from "mongoose";
import ShopSettings from "./components/Shop/ShopSettings.jsx";
import ShopWithDrawMoneyPage from "./pages/Shop/ShopWithDrawMoneyPage.jsx";
import UserInbox from "./pages/UserInbox.jsx";

