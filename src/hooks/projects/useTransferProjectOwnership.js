import { useMutation } from "@tanstack/react-query"
import { transferProjectOwnership } from "../../api/projectAPI"
import toast from "react-hot-toast"


export const useTransferProjectOwnership = () => {

    const { mutate, isPending, error } = useMutation({
        mutationFn: transferProjectOwnership({ projectd, newOwnerId }),

        onError: (error) => {
            console.error(error)
            toast.error(error.response.data.message);
        }
    })
    return { mutate, isPending, error }
}