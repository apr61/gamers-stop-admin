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
  DRAWER_TITLE: string;
  TABLE_NAME: string;
  DATA_TABLE_TITLE: string;
  ADD_NEW_ITEM: string;
};

export type FetchDataListType = {
  from: number;
  to: number;
};

export type EditFilesType = {
  files: FileList,
  path: string[]
}
