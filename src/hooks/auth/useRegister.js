// hooks/auth/useRegister.js
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authAPI";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import toast from "react-hot-toast";

export const useRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  return useMutation({
    mutationFn: (registerData) => registerUser(registerData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success("User registered successfully");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      toast.error(error.response.data.message || error.response.data.errors[0].msg);
    },
  });
};