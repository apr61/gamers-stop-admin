import supabase from "../../utils/supabase";
import { uploadFiles, deleteFile } from "../api/fileUpload";
import {
  Category,
  CategoryFormValues,
  CustomError,
  QueryType,
} from "@/types/api";
import errorHandler from "../errorHandler";

export async function createCategory(
  values: CategoryFormValues,
): Promise<Category | null> {
  try {
    let categoryImageUrl = "";

    if (values.category_image && values.category_image.length > 0) {
      const [url] = await uploadFiles(values.category_image, "category_images");
      categoryImageUrl = url;
    }

    const { data, error } = await supabase()
      .from("categories")
      .insert({
        category_name: values.category_name,
        category_image: categoryImageUrl,
      })
      .select("*")
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    errorHandler(err as CustomError);
    return null;
  }
}

export async function getCategories() {
  const { data, error } = await supabase().from("categories").select("*");

  if (error) throw error;

  return data;
}

export async function getCategoryById(id: number) {
  try {
    const { data, error } = await supabase()
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    errorHandler(err as CustomError);
    return null;
  }
}

export async function updateCategory(id: number, values: CategoryFormValues) {
  try {
    let categoryImageUrl = "";

    const { data: imagesData, error: imagesError } = await supabase()
      .from("categories")
      .select("category_image")
      .eq("id", id);

    if (imagesError) throw imagesError;

    if (values.category_image && values.category_image.length > 0) {
      await deleteFile([imagesData[0].category_image]);
      const data = await uploadFiles(values.category_image, "category_images");
      categoryImageUrl = data[0];
    }

    const { data, error } = await supabase()
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
  } catch (err) {
    errorHandler(err as CustomError);
    return null;
  }
}

export async function deleteCategory(id: number) {
  try {
    const { data: categoryData, error: fetchError } = await supabase()
      .from("categories")
      .select("category_image")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const { error } = await supabase().from("categories").delete().eq("id", id);

    if (error) throw error;

    if (categoryData && categoryData.category_image) {
      await deleteFile([categoryData.category_image]);
    }

    return id;
  } catch (err) {
    errorHandler(err as CustomError);
    return null;
  }
}

export const searchCategories = async (query: QueryType<Category>) => {
  try {
    const { count, error: countError } = await supabase()
      .from("categories")
      .select("*", { count: "exact", head: true });
    if (countError) {
      throw new Error(countError.message);
    }
    const { data, error } = await supabase()
      .from("categories")
      .select("*")
      .ilike(`${query.search.query}`, `%${query.search.with}%`)
      .order("created_at", { ascending: false })
      .range(query.pagination.from, query.pagination.to);

    if (error) {
      throw error;
    }

    const response = {
      data: data ? data : [],
      count: data.length > 0 && query.search.with ? data.length : count,
    };
    return response;
  } catch (err) {
    errorHandler(err as CustomError);
    return {
      data: [],
      count: 0,
    };
  }
};
