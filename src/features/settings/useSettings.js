import { useQuery } from "@tanstack/react-query";
import {getSettings} from "../../services/apiSettings.js"

export function useSettings(){

    
    const{data:settings ,  error, isLoading} = useQuery({
        queryKey:['setting'],
        queryFn: getSettings
    })

    console.log(settings);
    

    
    return {settings , error, isLoading}

}