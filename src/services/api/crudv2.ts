import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  searchCategories,
} from "../api/categories";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} from "../api/product";

import {
  CategoryFormValues,
  Data,
  ProductFormValues,
  QueryType,
  TableName,
} from "../../utils/types";
import { listAllUsers } from "./users";
import { searchAddresses } from "./addresses";
import { searchOrders } from "./orders";

type FormValues = CategoryFormValues | ProductFormValues;

const createRecord = async (
  tableName: TableName,
  formValues: FormValues
): Promise<Data> => {
  switch (tableName) {
    case "categories":
      return await createCategory(formValues as CategoryFormValues);
    case "products":
      return await createProduct(formValues as ProductFormValues);
    default:
      throw new Error(`Unsupported table: ${tableName}`);
  }
};

const getRecords = async (tableName: TableName): Promise<Data[]> => {
  switch (tableName) {
    case "categories":
      return await getCategories();
    case "products":
      return await getProducts();
    default:
      throw new Error(`Unsupported table: ${tableName}`);
  }
};

const getRecordById = async (
  tableName: TableName,
  id: number
): Promise<any> => {
  switch (tableName) {
    case "categories":
      return await getCategoryById(id);
    case "products":
      return await getProductById(id);
    default:
      throw new Error(`Unsupported table: ${tableName}`);
  }
};

const updateRecord = async (
  tableName: TableName,
  id: number,
  formValues: FormValues
): Promise<any> => {
  switch (tableName) {
    case "categories":
      return await updateCategory(id, formValues as CategoryFormValues);
    case "products":
      return await updateProduct(id, formValues as ProductFormValues);
    default:
      throw new Error(`Unsupported table: ${tableName}`);
  }
};

const deleteRecord = async (tableName: TableName, id: number): Promise<any> => {
  switch (tableName) {
    case "categories":
      return await deleteCategory(id);
    case "products":
      return await deleteProduct(id);
    default:
      throw new Error(`Unsupported table: ${tableName}`);
  }
};

const search = async (tableName: TableName, query: QueryType) => {
  switch (tableName) {
    case "categories":
      return await searchCategories(query);
    case "products":
      return await searchProducts(query);
    case "users":
      return await listAllUsers();
    case "addresses":
      return await searchAddresses(query);
    case "orders":
      return await searchOrders(query);
    default:
      throw new Error(`Unsupported table: ${tableName}`);
  }
};

export {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  search,
};
