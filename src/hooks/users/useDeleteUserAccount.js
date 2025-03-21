import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { deleteUserAccount } from "../../api/usersAPI";


export const useDeleteUserAccount = () => {
    const navigate = useNavigate();

    const { mutate, isPending, error } = useMutation({
        mutationFn: (userId) => deleteUserAccount(userId),
        onSuccess: (data) => {
            toast.success(data.message)
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate("/login")
        },
        onError: (error) => {
            console.error(error.message);
            toast.error(error.response.data.message || error.response.data.errors[0].msg);
        }
    })
    return { deleteAccount: mutate, isdeletingAccount: isPending, errorDeletingAccount: error }
}