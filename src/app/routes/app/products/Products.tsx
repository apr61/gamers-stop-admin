import ProductHeader from "@/features/products/components/ProductHeader";
import ListProducts from "@/features/products/components/ListProducts";
import DeleteProduct from "@/features/products/components/DeleteProduct";

export const Products = () => {
  return (
    <div className="my-8">
      <ProductHeader />
      <div className="my-4">
        <ListProducts />
      </div>
      <DeleteProduct />
    </div>
  );
};

