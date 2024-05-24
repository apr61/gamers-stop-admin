import supabase from "../../utils/supabase";
import { Product, QueryType } from "../../utils/types";

const readAllProducts = async (query: QueryType): Promise<Product[]> => {
  const { data, error } = await supabase.supabase
    .from("products")
    .select(`*, category:categories(id, category_name, category_image)`)
    .ilike(`${query.search.query}`, `%${query.search.with}%`)
    .order("created_at", { ascending: false })
    .range(query.pagination.from, query.pagination.to);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export { readAllProducts };
