import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeUserAdmin } from "../../api/usersAPI";
import toast from "react-hot-toast";

export const useMakeUserAdmin = ({ projectId }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId }) => makeUserAdmin({ userId, projectId }),
        onSuccess: () => {
            queryClient.invalidateQueries(["project", projectId]);
            queryClient.invalidateQueries("users");
        },
        onError: (error) => {
            console.error("Error making admin:", error);
            toast.error(error.response.data.message || error.response.data.errors[0].msg);
        }
    });
};