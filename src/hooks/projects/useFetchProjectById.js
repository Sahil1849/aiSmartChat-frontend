import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "../../api/projectAPI";

export const useFetchProjectById = (projectId) => {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: () => fetchProjectById(projectId),
        enabled: !!projectId, // Only fetch if projectId exists
        onError: (error) => {
            console.error("Error fetching project:", error);
        },
    });
};