import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../../api/projectAPI";
import toast from "react-hot-toast";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const {mutate, isPending, error}= useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project Created");
    },
    onError: (error) => {
      console.error("Error creating project:", error);
      toast.error(error.response.data.message || error.response.data.errors[0].msg);
    },
  });
  return {createProject: mutate, isCreating:isPending, errorCreating:error}
};