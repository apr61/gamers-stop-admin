import { nanoid } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";
import {
  Category,
  FetchDataListType,
} from "../../utils/types";
import { deleteFile } from "./fileUpload";

// Function to read all documents from a table in Supabase
const readAllCategories = async (query: FetchDataListType) => {
  try {
    const { count, error: countError } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });
    if (countError) {
      throw new Error(countError.message);
    }

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false })
      .range(query.from, query.to);

    if (error) {
      throw new Error(error.message);
    }

    const response = {
      data: data ? data : [],
      count: count ? count : 0,
    };
    return response;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

// Function to insert a document into Supabase
const insertCategory = async (documentData: Omit<Category, "id"> ) => {
  try {
    const { error } = await supabase.from("categories").insert(documentData);

    if (error) {
      throw new Error(error.message);
    }

    return { ...documentData, id: nanoid() };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

const deleteCategoryById = async (category: Category) => {
  try {
    const [deleteCategoryResult] = await Promise.all([
      supabase.from("categories").delete().eq("id", category.id),
      deleteFile([category.category_image]),
    ]);
    
    const { error } = deleteCategoryResult;

    if (error) {
      throw new Error(error.message);
    }
    return category.id;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

const updateCategory = async (
  category: Category,
) => {
  try {
      await supabase
        .from("categories")
        .update({
          category_name: category.category_name,
          category_image: category?.category_image,
        })
        .eq("id", category.id);

      return category
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export {
  readAllCategories,
  insertCategory,
  deleteCategoryById,
  updateCategory,
};
