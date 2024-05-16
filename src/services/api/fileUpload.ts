import supabase from "../../utils/supabase";
import { nanoid } from "@reduxjs/toolkit";

// Function to upload multiple files to Supabase Storage
const uploadFiles = async (fileList: FileList, bucketName: string) => {
  const files = Array.from(fileList);
  try {
    const uploads = files.map(async (file) => {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(nanoid(), file);

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        const { data: publicUrl } = supabase.storage
          .from(bucketName)
          .getPublicUrl(data.path);
        return publicUrl.publicUrl;
      }
      return null;
    });

    const results = await Promise.all(uploads);
    return results.filter((url): url is string => url !== null);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

const deleteFile = async (fileUrl: string) => {
  try {
    const bucketName = fileUrl.split("/").at(-2);
    const fileName = fileUrl.split("/").at(-1);
    if (bucketName && fileName) {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .remove([fileName]);
      return { data, error };
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

const updateFile = async (fileList: FileList, fileUrl: string) => {
  const files = Array.from(fileList);
  try {
    const bucketName = fileUrl.split("/").at(-2);
    const fileName = fileUrl.split("/").at(-1);
    if (bucketName && fileName) {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .update(fileName, files[0], {
          upsert: true,
        });
      if (error) {
        throw new Error(error.message);
      }
      if (data) {
        const { data: publicUrl } = supabase.storage
          .from(bucketName)
          .getPublicUrl(data.path);
        return publicUrl;
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export { uploadFiles, deleteFile, updateFile };
