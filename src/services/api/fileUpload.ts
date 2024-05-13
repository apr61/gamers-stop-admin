import supabase from "../../utils/supabase";
import {nanoid} from "@reduxjs/toolkit"

// Function to upload multiple files to Supabase Storage
const uploadFiles = async (fileList: FileList) => {
  const files = Array.from(fileList)
  try {
    const uploads = files.map(async (file) => {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(file.name + nanoid(), file);

        
        if (error) {
          throw new Error(error.message);
        }
        
        if(data){
          const {data: publicUrl} = supabase.storage.from("images").getPublicUrl(data.path)
          return publicUrl
        }

      return data;
    });

    const results = await Promise.all(uploads);
    return results;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export { uploadFiles };
