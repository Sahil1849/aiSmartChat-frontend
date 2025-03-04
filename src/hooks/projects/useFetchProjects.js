// hooks/projects/useFetchProjects.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProjects } from "../../api/projectAPI";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

export const useFetchProjects = () => {
  const userId = localStorage.getItem('userId');


  return useQuery({
    queryKey: ["projects", userId],
    queryFn: fetchProjects,
    onError: (error) => {
      console.error("Error fetching projects:", error);
    },
    onSuccess: (data) => {
      console.log("Projects fetched successfully:", data);
      window.location.reload();
    },
  });
};
