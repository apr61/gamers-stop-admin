import supabase from "../../utils/supabase";
import { nanoid } from "@reduxjs/toolkit";

export type EditFilesType = {
  files: FileList;
  path: string[];
};

const uploadFile = async (file: File, bucketName: string) => {
  const { data, error } = await supabase().storage
    .from(bucketName)
    .upload(nanoid(), file);

  if (error) {
    throw error 
  }

  if (data) {
    return getPublicUrl(data.path, bucketName);
  }
};

// Function to upload multiple files to Supabase Storage
const uploadFiles = async (fileList: FileList, bucketName: string) => {
  const files = Array.from(fileList);
  try {
    const uploads = files.map(async (file) => {
      return await uploadFile(file, bucketName);
    });

    const results = await Promise.all(uploads);
    return results.filter((url): url is string => url !== null);
  } catch (error) {
    throw error
  }
};

const deleteFile = async (fileUrl: string[]) => {
  try {
    const deletedFiles = fileUrl.map(async (url) => {
      const bucketName = url.split("/").at(-2);
      const fileName = url.split("/").at(-1);
      if (bucketName && fileName) {
        const { data, error } = await supabase().storage
          .from(bucketName)
          .remove([fileName]);
        return { data, error };
      }
    });
    const result = Promise.all(deletedFiles);
    return result;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

/*
const updateFile = async (editFileData: EditFilesType): Promise<string[]> => {
  const { files, path } = editFileData;
  const fileArray = Array.from(files);

  if (fileArray.length !== path.length) {
    throw new Error("The number of files and paths must match.");
  }

  try {
    const uploadPromises = fileArray.map(async (file, index) => {
      const filePath = path[index];
      const bucketName = filePath.split("/").at(-2);
      const fileName = filePath.split("/").at(-1);

      if (!bucketName || !fileName) {
        throw new Error("Bucket name or file name is missing.");
      }

      // Check if the file exists
      const { error: checkError } = await supabase().storage
        .from(bucketName)
        .download(fileName);

      if (checkError) {
        // If file does not exist, upload it
        return uploadFile(file, bucketName);
      } else {
        // If file exists, update it
        const { data: updateData, error: updateError } = await supabase().storage
          .from(bucketName)
          .update(fileName, file, {
            cacheControl: '0',
            upsert: true,
          });

        if (updateError) {
          throw new Error(updateError.message);
        }

        if (updateData) {
          return getPublicUrl(updateData.path, bucketName);
        }
      }

      throw new Error("An unexpected error occurred while handling the file.");
    });

    const publicUrls = await Promise.all(uploadPromises);
    return publicUrls;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
*/


const getPublicUrl = (path: string, bucketName: string) => {
  const { data } = supabase().storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
};

export { uploadFiles, deleteFile };
