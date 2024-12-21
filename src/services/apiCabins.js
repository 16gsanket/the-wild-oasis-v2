import { QueryErrorResetBoundary } from "@tanstack/react-query";
import supabase from "./supabase";

 async function getCabins(){
const { data, error } = await supabase
.from('cabins')
.select('*')

if(error){
    console.error(error)
    throw new Error('Cabins could not be loaded')
}

return data;
}
async function deleteCabins(id){
    console.log("the id we get is:" , id);
    
const { error } = await supabase
    .from('cabins')
    .delete()
    .eq("id", id)
    
    if(error){
        console.log(error);
        
        throw new Error('Cabin cannot be deleted')
    }
    return error;
    
}
async function createCabins(newCabin){
    console.log(newCabin);
    
    const { data, error } = await supabase
  .from('cabins')
  .insert([
    newCabin
  ])


  if(error){
    throw new Error('cannot insert a new Cabin')
  }
}
export {getCabins , deleteCabins , createCabins};