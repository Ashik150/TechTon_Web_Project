import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineGift,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { useState, useEffect } from "react";
import { server } from "../../server";
import { User } from "../../../../backend/models/user.model";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useAuthStore } from "../../store/authStore";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { MdOutlineTrackChanges } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserInformation,
  updatUserAddress,
  deleteUserAddress,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import { loadUser } from "../../redux/actions/user";
import axios from "axios";
import { Country, State } from "country-state-city";
import { set } from "mongoose";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const ProfileContent = ({ active }) => {
  const { user } = useAuthStore();
  const { error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome to your profile page!</p>
    </div>
  );
};

export default ProfileContent;
