// hooks/users/useFetchAllUsers.js
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../api/usersAPI";

export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    onError: (error) => {
      console.error("Error fetching users:", error);
    },
  });
};