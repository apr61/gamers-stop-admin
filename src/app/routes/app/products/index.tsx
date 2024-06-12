import ProductHeader from "@/features/products/components/ProductHeader";
import ListProducts from "@/features/products/components/ListProducts";

const Products = () => {
	return (
		<div className="my-8">
			<ProductHeader />
			<div className="my-4">
				<ListProducts />
			  </div>
		</div>
	);
};

export default Products;
