import ListCategories from "@/features/categories/components/ListCategories";
import CategoryHeader from "@/features/categories/components/CategoryHeader";
import EditCategory from "@/features/categories/components/EditCategory";
import CreateCategory from "@/features/categories/components/CreateCategory";

const Categories = () => {
	return (
		<div>
			<CategoryHeader />
			<ListCategories />
			<EditCategory />
			<CreateCategory />
		</div>
	);
};

export default Categories;
