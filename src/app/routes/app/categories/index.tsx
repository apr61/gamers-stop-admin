import ListCategories from "@/features/categories/components/ListCategories";
import CategoryHeader from "@/features/categories/components/CategoryHeader";
import EditCategory from "@/features/categories/components/EditCategory";
import CreateCategory from "@/features/categories/components/CreateCategory";
import CategoryDelete from "@/features/categories/components/DeleteCategory";
import ReadCategory from "@/features/categories/components/ReadCategory";

const Categories = () => {
  return (
    <div className="my-8">
      <CategoryHeader />
      <div className="my-4">
        <ListCategories />
      </div>
      <EditCategory />
      <CreateCategory />
      <CategoryDelete />
      <ReadCategory />
    </div>
  );
};

export default Categories;
