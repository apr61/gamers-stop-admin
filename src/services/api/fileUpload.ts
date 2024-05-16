import supabase from "../../utils/supabase";
import { nanoid } from "@reduxjs/toolkit";
import { EditFilesType } from "../../utils/types";

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

const deleteFile = async (fileUrl: string[]) => {
  try {
    const deletedFiles = fileUrl.map(async (url) => {
      const bucketName = url.split("/").at(-2);
      const fileName = url.split("/").at(-1);
      if (bucketName && fileName) {
        const { data, error } = await supabase.storage
        .from(bucketName)
        .remove([fileName]);
        return { data, error };
      }
    })
    const result = Promise.all(deletedFiles)
    return result
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

const updateFile = async (editFileData: EditFilesType): Promise<string[]> => {
  const { files, path } = editFileData;
  const fileArray = Array.from(files);

  if (fileArray.length !== path.length) {
    throw new Error('The number of files and paths must match.');
  }

  try {
    const uploadPromises = fileArray.map(async (file, index) => {
      const filePath = path[index];
      const bucketName = filePath.split("/").at(-2);
      const fileName = filePath.split("/").at(-1);

      if (bucketName && fileName) {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .update(fileName, file, {
            upsert: true,
          });

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          const { data: publicUrl } = supabase.storage
            .from(bucketName)
            .getPublicUrl(data.path);

          if (publicUrl?.publicUrl) {
            return publicUrl.publicUrl;
          }
        }
      }
      throw new Error('Bucket name or file name is missing.');
    });

    const publicUrls = await Promise.all(uploadPromises);
    return publicUrls;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export { uploadFiles, deleteFile, updateFile };
