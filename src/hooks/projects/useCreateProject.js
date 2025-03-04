// hooks/projects/useCreateProject.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../../api/projectAPI";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject, // Mutation function
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Refetch projects
    },
    onError: (error) => {
      console.error("Error creating project:", error);
    },
  });
};