import CrudLayout from "../../layout/CrudLayout";

const Categories = () => {
  const config = {
    tableName: "categories",
    entity: "Category",
  };
  return <CrudLayout config={config} />;
};

export default Categories;
