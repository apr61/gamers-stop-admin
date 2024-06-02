import supabase from "../../utils/supabase";
import { QueryType, ProductFormValues, Product } from "../../utils/types";
import { uploadFiles, deleteFile } from "../api/fileUpload";

export const searchProducts = async (query: QueryType<Product>) => {
  const { count, error: countError } = await supabase.supabase
    .from("products")
    .select("*", { count: "exact", head: true });
  if (countError) {
    throw new Error(countError.message);
  }
  const { data, error } = await supabase.supabase
    .from("products")
    .select(`*, category:categories(id, category_name, category_image)`)
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

export async function createProduct(
  values: ProductFormValues,
) {
  try {
    let imageUrls: string[] = [];

    if (values.images) {
      imageUrls = await uploadFiles(values.images, "product_images");
    }

    const { data, error } = await supabase.supabase
      .from("products")
      .insert({
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        category_id: values.category_id,
        images: imageUrls,
      })
      .select(`*, category:categories(id, category_name, category_image)`)
      .single()

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function getProducts() {
  try {
    const { data, error } = await supabase.supabase
      .from("products")
      .select("*, category:categories(*)");

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: number) {
  try {
    const { data, error } = await supabase.supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function updateProduct(id: number, values: ProductFormValues) {
  try {
    let imageUrls: string[] = [];

    const { data: imagesData, error: imagesError } = await supabase.supabase
      .from("products")
      .select("images")
      .eq("id", id)
      .single();

    if (imagesError) throw imagesError;

    if (imagesData) {
      await deleteFile(imagesData.images);
    }

    if (values.images) {
      imageUrls = await uploadFiles(values.images, "product_images");
    }

    const { data, error } = await supabase.supabase
      .from("products")
      .update({
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        category_id: values.category_id,
        images: imageUrls,
      })
      .eq("id", id)
      .select(`*, category:categories(id, category_name, category_image)`)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: number) {
  try {
    const { data: productData, error: fetchError } = await supabase.supabase
      .from("products")
      .select("images")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    const { error } = await supabase.supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;

    if (productData && productData.images.length > 0) {
      await deleteFile(productData.images);
    }

    return id;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
