import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../api/projectAPI";


export const useFetchProjects = () => {
  const userId = localStorage.getItem('userId');


  return useQuery({
    queryKey: ["projects", userId],
    queryFn: fetchProjects,
    onError: (error) => {
      console.error("Error fetching projects:", error);
      toast.error(error.response.data.message || error.response.data.errors[0].msg);
    },
    onSuccess: (data) => {
      console.log("Projects fetched successfully:", data);
      window.location.reload();
    },
  });
};
