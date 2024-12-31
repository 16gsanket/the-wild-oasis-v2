import { QueryErrorResetBoundary } from "@tanstack/react-query";
import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
async function deleteCabins(id) {
  console.log("the id we get is:", id);

  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);

    throw new Error("Cabin cannot be deleted");
  }
  return error;
}
async function createEditCabins(newCabin) {
  
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    throw new Error("cannot insert a new Cabin");
  }
  // 2. Upload the images
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if the image upload fails
  if(uploadError){
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log('error in uploading images');
    throw new Error("Image could not be uploaded");
  }

  
}
export { getCabins, deleteCabins, createEditCabins };
