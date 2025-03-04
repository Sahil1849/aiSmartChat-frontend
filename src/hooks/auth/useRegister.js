// hooks/auth/useRegister.js
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authAPI";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";

export const useRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  return useMutation({
    mutationFn: (registerData) => registerUser(registerData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};