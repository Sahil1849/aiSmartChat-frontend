import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/usersAPI";

export const useCurrentUser = (userId) => {
  const { data, isPending } = useQuery({
    queryKey: ["currentUser", userId],
    queryFn: () => getCurrentUser(userId),
    onError: (error)=>{
      console.error("Error fetching current user", error);
      toast.error(error.response.data.message || error.response.data.errors[0].msg);
    }
  });
  return { data, isPending };
};