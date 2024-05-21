import supabase from "../../utils/supabase";
import {
  Category,
  CategoryFormValues,
  CrudType,
  Data,
  Product,
  ProductFormValues,
  QueryType,
  TableName,
} from "../../utils/types";
import { deleteFile, updateFile, uploadFiles } from "./fileUpload";
import { readAllProducts } from "./product";

type DocumentData = CategoryFormValues | ProductFormValues;
type CategoryNewData = Omit<Category, "id">;
type ProductNewData = Omit<Product, "id">;
type NewData = CategoryNewData | ProductNewData;

const insertNewRecord = async (tableName: TableName, newData: NewData) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .insert(newData)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
    return null;
  }
};

// Function to insert a document into Supabase
const insertRecordWithUpload = async (
  documentData: DocumentData,
  tableName: TableName,
): Promise<Data | null> => {
  try {
    let imageUrls: string[] = [];
    // Check for Category
    let newData: NewData;
    if ("category_image" in documentData && documentData.category_image) {
      imageUrls = await uploadFiles(documentData.category_image, "images");
      if (imageUrls.length <= 0) throw new Error("Unable to upload images");
      newData = {
        ...documentData,
        category_image: imageUrls[0],
      };
      return await insertNewRecord(tableName, newData);
    }
    // Check for Prodcut
    if ("images" in documentData && documentData.images) {
      imageUrls = await uploadFiles(documentData.images, "images");
      if (imageUrls.length <= 0) throw new Error("Unable to upload images");
      newData = {
        ...documentData,
        images: imageUrls,
      };
      return await insertNewRecord(tableName, newData);
    }
    return null;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    return null;
  }
};

// Function to update a document in Supabase by ID
const updateRecordById = async (
  documentData: NewData,
  tableName: TableName,
  id: string,
) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .update(documentData)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return { ...documentData, id };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    return null;
  }
};

const updateRecordByIdWithUpload = async (
  documentData: DocumentData,
  tableName: TableName,
  path: string[],
  id: string,
) => {
  try {
    let imageUrls: string[] = [];
    // Check for Category
    let newData: NewData;
    if ("category_image" in documentData && documentData.category_image) {
      imageUrls = await updateFile({
        files: documentData.category_image,
        path: path,
      });
      if (imageUrls.length <= 0) throw new Error("Unable to upload images");
      newData = {
        ...documentData,
        category_image: imageUrls[0],
      };
      return await updateRecordById(newData, tableName, id);
    }
    // Check for Prodcut
    if ("images" in documentData && documentData.images) {
      imageUrls = await updateFile({
        files: documentData.images,
        path: path,
      });
      if (imageUrls.length <= 0) throw new Error("Unable to upload images");
      newData = {
        ...documentData,
        images: imageUrls,
      };
      return await updateRecordById(newData, tableName, id);
    }
    return null;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    return null;
  }
};

// Function to delete a document from Supabase by ID
const deleteRecordById = async ({
  tableName,
  id,
  withFile,
  data,
}: CrudType) => {
  try {
    if (withFile) {
      let urls: string[] = [];
      if ("category_name" in data) {
        urls = [data.category_image];
      } else if ("name" in data) {
        urls = data.images;
      }
      const [deleteCategoryResult] = await Promise.all([
        supabase.from(tableName).delete().eq("id", id),
        deleteFile(urls),
      ]);

      const { error } = deleteCategoryResult;

      if (error) {
        throw new Error(error.message);
      }
      return id;
    } else {
      const { error } = await supabase.from(tableName).delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
      return id;
    }
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

// Function to read a document from Supabase by ID
const readRecordById = async ({ tableName, id }: CrudType) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

// Function to read all documents from a table in Supabase
const search = async (tableName: TableName, query: QueryType) => {
  try {
    const { count, error: countError } = await supabase
      .from(tableName)
      .select("*", { count: "exact", head: true });
    if (countError) {
      throw new Error(countError.message);
    }

    if (tableName === "products") {
      const data = await readAllProducts(query);
      const response = {
        data: data ? data : [],
        count: count ? count : 0,
      };
      return response;
    }

    const { data, error } = await supabase
      .from(tableName)
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
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

const readAll = async (tableName: TableName): Promise<Data[]> => {
  try {
    const { data, error } = await supabase.from(tableName).select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
    return [];
  }
};

export {
  insertNewRecord,
  insertRecordWithUpload,
  updateRecordById,
  updateRecordByIdWithUpload,
  deleteRecordById,
  readRecordById,
  search,
  readAll,
};
