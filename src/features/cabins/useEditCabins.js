import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabins(){
const queryClient = useQueryClient();
    const { mutate: editcaib, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabin, id }) => createEditCabins(newCabin, id),
        onSuccess: () => {
          toast.success("Cabin Created Successfully");
          queryClient.invalidateQueries({
            queryKey: ["cabin"],
          });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });
      return {editcaib , isEditing}
}