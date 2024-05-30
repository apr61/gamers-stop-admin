import { AsyncThunk } from "@reduxjs/toolkit";
import { ReactElement } from "react";

export type Category = {
  id: number;
  category_name: string;
  category_image: string;
};

export type CategoryFormValues = {
  category_name: string;
  category_image: FileList | null;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category_id: number;
  images: string[];
  category: Category;
};

export type ProductFormValues = {
  name: string;
  images: FileList | null;
  quantity: number;
  price: number;
  description: string;
  category_id: string;
};

export type Address = {
  id: number;
  created_at: Date;
  user: CustomUser;
  isDefault: boolean;
  address: string;
  name: string;
  phoneNumber: string;
  pincode: string;
  townLocality: string;
  cityDistrict: string;
  state: string;
};

export type AddressFormValues = Omit<Address, "id" | "created_at" | "user"> & {
  userId: string;
};

export type Order = {
  id: number;
  user_id: string;
  user: CustomUser;
  products: Product[];
  address: Address;
  paymentstatus: string;
  orderstatus: string;
  totalprice: number;
  ordernumber: string;
  order_date: string;
  quantity: number;
};

export type User = {
  email: string;
  id: string;
  lastLogin: string;
  full_name: string;
  user_role: Roles;
  created_at: string;
  phone: string;
  last_updated: string;
  avatar_url: string;
};

export type CustomUser = {
  id: string;
  full_name: string;
  user_role: Roles;
  avatar_url: string;
};

export type OrderFields = {
  name: Field;
  paymentStatus: Field;
  orderStatus: Field;
  totalPrice: Field;
  orderNumber: Field;
};

export type SignUpFormValues = {
  full_name: string;
  email: string;
  password: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type ColumnConfig<T> = {
  title: string;
  dataIndex?: keyof T;
  render?: (record: T) => ReactElement | string;
};

interface AsyncThunkConfig {
  // Define any extra configurations or typing you need here
}

export type CrudConfig<T> = {
  DRAWER_TITLE: string;
  TABLE_NAME: TableName;
  DATA_TABLE_TITLE: string;
  ADD_NEW_ITEM: string;
  search: keyof T;
  columns: ColumnConfig<T>[];
  entity: {
    searchFn: AsyncThunk<never[] | { data: T[]; totalItems: number; }, QueryType, AsyncThunkConfig>;
    entityData: {
      data: T[];
      status: "idle" | "pending" | "succeeded" | "failed";
      error: string | null;
      search: {
        data: T[];
        totalItems: number;
      };
    };
  };
};

export type TableName =
  | "products"
  | "categories"
  | "orders"
  | "users"
  | "addresses";
export type Roles = "USER" | "ADMIN";

export type QueryType = {
  pagination: {
    from: number;
    to: number;
  };
  search: {
    query: keyof Category | keyof Product;
    with: string;
  };
  tableName: TableName;
};

export type Data = Order | Product | Category | CustomUser;

export type CrudType = {
  id: number;
  tableName: TableName;
  withFile: boolean;
  data: Data;
};

type Field = {
  type: string;
  required: boolean;
  label: string;
};

export type CategoryFields = {
  category_name: Field;
  category_image: Field;
};

export type ProductFields = {
  name: Field;
  image: Field;
  price: Field;
  quantity: Field;
  description: Field;
};

export type FetchDataListType = {
  from: number;
  to: number;
  search: string;
};

export type CategoryFormData = {
  category_name: string;
  files: FileList;
  imageUrls: string[];
  id: string;
};
