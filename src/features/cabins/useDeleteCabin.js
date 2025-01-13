import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabins as deleteCabinsApi } from "../../services/apiCabins"
import toast from "react-hot-toast"

export function useDeleteCabin() {
    const queryClient = useQueryClient()

    const{isLoading:isDeleting , mutate:deleteCabin} = useMutation({
      mutationFn : (id)=>deleteCabinsApi(id),
      onSuccess:()=>{
        toast.success('cabin deleted')
        queryClient.invalidateQueries(
          {
            queryKey:['cabin']
          }
        )
      },
      onError:(err)=>{
        toast.error(err.message)
      }
    })

    return {isDeleting , deleteCabin}
}