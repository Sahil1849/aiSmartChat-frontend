import { useMutation, useQueryClient } from "@tanstack/react-query"
import { removeUserFromProject } from "../../api/projectAPI"
import toast from "react-hot-toast";

export const useRemoveUserFromProject = ({ projectId }) => {
    const queryClient = useQueryClient();
    const { mutate, isPending, error } = useMutation({
        mutationFn: (userIdToRemove) => removeUserFromProject({ userIdToRemove, projectId }),
        onSuccess: () => {

            queryClient.invalidateQueries(['project'])
            toast.success("User removed from project");
        },
        onError: (error) => {
            console.error(error)
            toast.error(error.response.data.message || error.response.data.errors[0].msg);
        }
    })
    return { mutate, isPending, error }
}