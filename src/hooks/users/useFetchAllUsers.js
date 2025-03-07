// hooks/users/useFetchAllUsers.js
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../api/usersAPI";

export const useFetchAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
    onError: (error) => {
      console.error("Error fetching users:", error);
      toast.error(error.response.data.message || error.response.data.errors[0].msg);
    },
  });
};