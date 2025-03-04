import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../../api/authAPI";


export const useLogout = () => {
    const navigate = useNavigate();

    const { mutate, isPending, error } = useMutation({

        mutationFn: logOutUser,
        onSuccess: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login');

        },
        onError: (error) => {
            console.error('Logout failed:', error);
        },
    });
    return { mutate, isPending, error };
};