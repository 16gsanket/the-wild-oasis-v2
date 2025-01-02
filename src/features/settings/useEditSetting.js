import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useEditSetting(){
const queryClient = useQueryClient();
    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
          toast.success("Setting Updated Successfully");
          queryClient.invalidateQueries({
            queryKey: ["setting"],
          });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });
      return {isUpdating , updateSetting}
}