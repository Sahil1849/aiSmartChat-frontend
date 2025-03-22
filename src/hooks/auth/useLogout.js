import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../api/authAPI";
import toast from "react-hot-toast";


export const useLogout = () => {
    const navigate = useNavigate();

    const { mutate, isPending, error } = useMutation({

        mutationFn: logOutUser,
        onSuccess: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            toast.success("User logged out successfully");
            navigate('/login');

        },
        onError: (error) => {
            console.error('Logout failed:', error);
        },
    });
    return { logoutUser:mutate, isLoggingOut:isPending };
};