export type Category = {
  id: string;
  category_name: string;
  category_image: string;
};

export type CategoryFormValues = {
  categoryName: string;
  images: FileList;
};

export type CrudConfig = {
  tableName: string;
  entity: string;
};
