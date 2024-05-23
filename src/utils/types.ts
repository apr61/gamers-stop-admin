export type Category = {
  id: string;
  category_name: string;
  category_image: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category_id: string;
  images: string[];
  category?: Category;
};

export type Address = {
  id: number,
  created_at: Date,
  userId: string,
  isDefault: boolean
}

export type Order = {
  id: number,
  userId: string,
  products: number[],
  addressId: number,
  paymentStatus: boolean,
  orderStatus: string,
  totalPrice: number,
  orderNumber: string
}

export type OrderFields = {
  name: Field,
  paymentStatus: Field,
  orderStatus: Field,
  totalPrice: Field,
  orderNumber: Field
}

export type CategoryFormValues = {
  category_name: string;
  category_image: FileList | null;
};

export type ProductFormValues = {
  name: string;
  images: FileList | null;
  quantity: number;
  price: number;
  description: string;
  category_id: string;
};

export type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type CrudConfig = {
  DRAWER_TITLE: string;
  TABLE_NAME: TableName;
  DATA_TABLE_TITLE: string;
  ADD_NEW_ITEM: string;
  fields: Fields;
  search: keyof Category | keyof Product | keyof Order
};

export type Fields = CategoryFields | ProductFields | OrderFields
export type TableName = "products" | "categories" | "orders" | "users";
export type Roles = "USER" | "ADMIN"

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

export type Data = Product | Category;

export type CrudType = {
  id: string;
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
