import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProject } from "../../api/projectAPI"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending, error } = useMutation({
        mutationFn: (projectId) => deleteProject(projectId),
        onSuccess: (data) => {
            console.log(data);
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            navigate("/")
        },
        onError: (error) => {
            console.error(error.message);
            toast.error(error.response.data.message || error.response.data.errors[0].msg);
        }
    })
    return { deleteTheProject: mutate, isdeletingTheProject: isPending, errorDeletingTheProject: error }
}