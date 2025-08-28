import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileContent = () => {
  const { user } = useAuthStore();
  const { error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState();
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome to your profile page!</p>
    </div>
  );
};

export default ProfileContent;
