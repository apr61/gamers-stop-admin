import supabase from "../../utils/supabase";
import { uploadFiles, deleteFile, updateFile } from "../api/fileUpload";
import { Category, CategoryFormValues, QueryType } from "../../utils/types";

export async function createCategory(
  values: CategoryFormValues,
): Promise<Category> {
  try {
    let categoryImageUrl = "";

    if (values.category_image && values.category_image.length > 0) {
      const [url] = await uploadFiles(values.category_image, "category_images");
      categoryImageUrl = url;
    }

    const { data, error } = await supabase.supabase
      .from("categories")
      .insert({
        category_name: values.category_name,
        category_image: categoryImageUrl,
      })
      .select()
      .single()

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const { data, error } = await supabase.supabase
      .from("categories")
      .select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getCategoryById(id: number) {
  try {
    const { data, error } = await supabase.supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}

export async function updateCategory(id: number, values: CategoryFormValues) {
  try {
    let categoryImageUrl = "";

    const { data: imagesData, error: imagesError } = await supabase.supabase
      .from("categories")
      .select("category_image")
      .eq("id", id);

    if (imagesError) throw imagesError;

    if (values.category_image && values.category_image.length > 0) {
      const [url] = await updateFile({
        files: values.category_image,
        path: [imagesData[0].category_image],
      });
      categoryImageUrl = url;
    }

    const { data, error } = await supabase.supabase
      .from("categories")
      .update({
        category_name: values.category_name,
        category_image: categoryImageUrl,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}

export async function deleteCategory(id: number) {
  try {
    const { data: categoryData, error: fetchError } = await supabase.supabase
      .from("categories")
      .select("category_image")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const { error } = await supabase.supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;

    if (categoryData && categoryData.category_image) {
      await deleteFile([categoryData.category_image]);
    }

    return id;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

export const searchCategories = async (query: QueryType<Category>) => {
  const { count, error: countError } = await supabase.supabase
    .from("categories")
    .select("*", { count: "exact", head: true });
  if (countError) {
    throw new Error(countError.message);
  }
  const { data, error } = await supabase.supabase
    .from("categories")
    .select("*")
    .ilike(`${query.search.query}`, `%${query.search.with}%`)
    .order("created_at", { ascending: false })
    .range(query.pagination.from, query.pagination.to);

  if (error) {
    throw new Error(error.message);
  }

  const response = {
    data: data ? data : [],
    count: count ? count : 0,
  };
  return response;
};
