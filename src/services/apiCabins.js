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
async function createEditCabins(newCabin, id) {

  const hasImagePath = String(newCabin.image).indexOf(supabaseUrl) === 0;
  console.log(hasImagePath);
  
  console.log('newCabin is: ', newCabin);
  console.log('id is: ', id);
  
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log('inside the function,,', imageName);
  
  const imagePath =hasImagePath ? newCabin.image :`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
//  
  console.log('image path is: ', imagePath);
  
  let query = supabase.from("cabins");
  // 1. Insert the new cabin

  // Adding a new cabin
  if (!id) {
    const{data , error } = await query.insert([{ ...newCabin, image: imagePath }]);
    if (error) {
      throw new Error("cannot insert a new Cabin");
    }
  }
  // B] Editing a cabin
  if (id) {
    const{data , error } = await query.update({...newCabin, image: imagePath}).eq("id", id);
    if (error) {
      throw new Error("cannot edit a new Cabin");
    }
  }
  // const { data, error } = await query;

  // 2. Upload the images
  const { error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if the image upload fails
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log("error in uploading images");
    throw new Error("Image could not be uploaded");
  }
}

// export async function createEditCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   // 1. Create/edit cabin
//   let query = supabase.from("cabins");

//   // A) CREATE
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   // B) EDIT
//   if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

//   const { data, error } = await query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be created");
//   }

//   // 2. Upload image
//   if (hasImagePath) return data;

//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   // 3. Delete the cabin IF there was an error uplaoding image
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(storageError);
//     throw new Error(
//       "Cabin image could not be uploaded and the cabin was not created"
//     );
//   }

//   return data;
// }
export { getCabins, deleteCabins, createEditCabins };
