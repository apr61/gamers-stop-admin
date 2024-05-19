import supabase from "../../utils/supabase";
import {
  Category,
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
      .ilike("category_name", `%${query.search}%`)
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
const insertCategory = async (
  documentData: Omit<Category, "id">
): Promise<Category | null> => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .insert(documentData)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return data[0];
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    return null;
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

const updateCategory = async (category: Category) => {
  try {
    await supabase
      .from("categories")
      .update({
        category_name: category.category_name,
        category_image: category?.category_image,
      })
      .eq("id", category.id);

    return category;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    return null
  }
};

export type CategoryFormData = {
  category_name: string,
  files: FileList,
  imageUrls: string[],
  id: string
}

const addCategoryFileUpload = async (
  formData: Omit<CategoryFormData, "imageUrls" | "id">
) => {
  try {
    let imageUrls: string[] = [];
    if (formData.files.length > 0) {
      imageUrls = await uploadFiles(formData.files, "images");
    }

    if (imageUrls.length <= 0) throw new Error("Unable to upload images");

    const categoryData: Omit<Category, "id"> = {
      category_name: formData.category_name,
      category_image: imageUrls[0],
    };

    const newCategory = await insertCategory(categoryData);
    return newCategory;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return null;
  }
};

const updateCategoryFileUpload = async (formData: CategoryFormData) => {
  try {
    let imageUrls: string[] = [];
    if (formData.files.length > 0) {
      imageUrls = await updateFile({
        files: formData.files,
        path: formData.imageUrls,
      });
    }

    if (imageUrls.length <= 0) throw new Error("Unable upload images");

    const categoryData: Category = {
      category_name: formData.category_name,
      category_image: imageUrls[0],
      id: formData.id
    };

    const updatedCategory = await updateCategory(categoryData);
    return updatedCategory;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return null;
  }
};

export {
  readAllCategories,
  deleteCategoryById,
  updateCategory,
  addCategoryFileUpload,
  updateCategoryFileUpload,
};
