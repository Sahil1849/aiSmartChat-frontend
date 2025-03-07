import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCollaboratorsToProject } from "../../api/usersAPI";
import toast from "react-hot-toast";

export const useAddCollaborators = (projectId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userIds) => addCollaboratorsToProject(projectId, userIds),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["project"],
            });
            toast.success("user added to the project");
        },
        onError: (error)=> {
            console.log("error: ", error)
            toast.error(error.response.data.message || error.response.data.errors[0].msg);
        }
    });
};