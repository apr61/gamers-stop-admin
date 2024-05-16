import { nanoid } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";
import {
  Category,
  CategoryFormValues,
  FetchDataListType,
} from "../../utils/types";
import { deleteFile, updateFile, uploadFiles } from "./fileUpload";

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
const insertCategory = async (documentData: CategoryFormValues) => {
  try {
    const newCategoryData = {
      category_name: documentData.categoryName,
    };

    const { error } = await supabase.from("categories").insert(newCategoryData);

    if (error) {
      throw new Error(error.message);
    }

    return { ...newCategoryData, id: nanoid() };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

const deleteCategoryById = async (category: Category) => {
  try {
    const [deleteCategoryResult, deleteFileResult] = await Promise.all([
      supabase.from("categories").delete().eq("id", category.id),
      deleteFile(category.category_image),
    ]);

    // Extract error from the deleteCategoryResult
    const { error } = deleteCategoryResult;

    if (error) {
      throw new Error(error.message);
    }
    if (deleteFileResult?.error) {
      throw new Error(deleteFileResult?.error.message);
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
  categoryForm: CategoryFormValues,
) => {
  console.log(categoryForm);
  try {
    const fileResponse = await updateFile(
      categoryForm.images,
      category.category_image,
    );

    if (fileResponse?.publicUrl) {
      await supabase
        .from("categories")
        .update({
          category_name: categoryForm.categoryName,
          category_image: fileResponse?.publicUrl,
        })
        .eq("id", category.id);
    }
    if (fileResponse?.publicUrl) {
      return {
        ...category,
        category_name: categoryForm.categoryName,
        category_image: fileResponse.publicUrl,
      };
    }
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
