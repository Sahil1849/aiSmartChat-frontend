import { useMutation, useQueryClient } from "@tanstack/react-query"
import { exitProject } from "../../api/projectAPI"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useExitProject = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending, error } = useMutation({
        mutationFn: (projectId) => exitProject(projectId),
        onSuccess: () => {
            navigate('/');
            queryClient.invalidateQueries(['projects'])
        },
        onError: (error) => {
            console.error(error)
            toast.error(error.response.data.message || error.response.data.errors[0].msg);
        }
    })
    return { mutate, isPending, error }
}