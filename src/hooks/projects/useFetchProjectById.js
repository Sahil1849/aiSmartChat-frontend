import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "../../api/projectAPI";

export const useFetchProjectById = (projectId) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: () => fetchProjectById(projectId),
        enabled: !!projectId, 
        onError: (error) => {
            console.error("Error fetching project:", error);
            toast.error(error.response.data.message || error.response.data.errors[0].msg);
        },
    });
};