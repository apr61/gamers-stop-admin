import { nanoid } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";
import { CategoryFormValues } from "../../utils/types";
import { uploadFiles } from "./fileUpload";

// Function to read all documents from a table in Supabase
const readAllCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

// Function to insert a document into Supabase
const insertCategory = async (documentData: CategoryFormValues) => {
  try {
    const fileResponse = await uploadFiles(documentData.images);

    if (fileResponse === undefined) throw new Error("Error uploading images");

    const newCategoryData = {
      category_name: documentData.categoryName,
      category_image: fileResponse[0].publicUrl,
    };

    const { error } = await supabase
      .from("categories")
      .insert(newCategoryData);

    if (error) {
      throw new Error(error.message);
    }
    

    return {...newCategoryData, id: nanoid()};
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export { readAllCategories, insertCategory };
