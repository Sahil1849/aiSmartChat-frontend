import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCollaboratorsToProject } from "../../api/usersAPI";

export const useAddCollaborators = (projectId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userIds) => addCollaboratorsToProject(projectId, userIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project", projectId] }); // Refetch project data
        },
        onError: (error) => {
            console.error("Error adding collaborators:", error);
        },
    });
};