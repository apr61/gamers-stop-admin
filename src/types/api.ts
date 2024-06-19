import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { ReactElement } from "react";

export type ItemsViewType = "GRID" | "LIST";

export type ItemActionsType = {
  label: string;
  icon: JSX.Element;
  key: "READ" | "UPDATE" | "DELETE";
  className: string;
};

export type Category = {
  id: number;
  category_name: string;
  category_image: string;
};

export type CategoryFormValues = {
  category_name: string;
  category_image: FileList | null;
};

export type Brand = {
  id: number;
  brand_name: string;
};

export type BrandFormValues = {
  brand_name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category_id: number;
  created_at: string;
  images: string[];
  category: Category | null;
  brand: Brand | null;
};

export type ProductFormValues = {
  name: string;
  images: FileList | null;
  quantity: number;
  price: number;
  description: string;
  category_id: number;
  brand_id: number;
};

export type OrderFormValues = {
  user_id: string;
  address_id: number;
  payment_status: string;
  order_status: string;
  total_price: number;
  products_ordered: {
    id: number;
    quantity: number;
  }[];
};

export type Address = {
  id: number;
  created_at: string;
  userId: string;
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

export type ProductsOrdered = {
  product: Product | null;
  quantity_ordered: number;
};

export type Order = {
  id: number;
  user: Omit<CustomUser, "user_role" | "created_at" | "addresses"> | null;
  products_ordered: ProductsOrdered[];
  address: Omit<Address, "user" | "userId" | "created_at" | "isDefault"> | null;
  payment_status: string;
  order_status: string;
  total_price: number;
  order_number: number;
  order_date: string;
};

export type User = {
  email: string;
  id: string;
  lastLogin: string;
  full_name: string;
  user_role: user_role;
  created_at: string;
  phone: string;
  last_updated: string;
  avatar_url: string;
};

export type UserFormData = {
  email: string;
  full_name: string;
  user_role: user_role;
  phone: string;
  avatar_url: string;
};

export type CustomUser = {
  id: string;
  full_name: string | null;
  user_role: USER_ROLE;
  avatar_url: string | null;
  email: string;
  created_at: string;
  addresses: Omit<Address, "user" | "userId">[];
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
  render?: (record: T) => ReactElement | string | ReactElement[] | null;
  className?: string;
};

export type CrudConfig<T> = {
  DRAWER_TITLE: string;
  TABLE_NAME: TableName;
  DATA_TABLE_TITLE: string;
  ADD_NEW_ITEM: string;
  search: keyof T;
  columns: ColumnConfig<T>[];
  readItem: ColumnConfig<T>[];
  entity: {
    entityData: {
      data: T[];
      status: "idle" | "pending" | "succeeded" | "failed";
      error: string | null;
      search: {
        data: T[];
        totalItems: number;
      };
    };
    current: {
      action: "create" | "read" | "update" | "delete";
      record: T | null;
      status: "idle" | "pending" | "succeeded" | "failed";
      error: string | null;
    };
    searchFn: (query: QueryType<T>) => void;
    deleteFn: (record: T) => Promise<void>;
    resetEntityStateFn: () => void;
    setCurrentItemFn: (
      action: "read" | "update" | "delete" | "create",
      record: T | null,
    ) => void;
  };
};

export type TableName =
  | "products"
  | "categories"
  | "orders"
  | "users"
  | "addresses"
  | "brands";
export type user_role = "USER" | "ADMIN";

export type QueryType<T> = {
  pagination: {
    from: number;
    to: number;
  };
  search: {
    query: keyof T;
    with: string;
  };
  tableName: TableName;
};

export type Data = Order | Product | Category | CustomUser;

export type USER_ROLE = "user" | "admin";

export type CustomError =
  | PostgrestError
  | AuthError
  | {
      code: string;
      message: string;
    };
