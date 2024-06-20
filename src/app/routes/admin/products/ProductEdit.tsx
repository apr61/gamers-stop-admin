import ProductsForm from "@/features/products/components/ProductForm";
import { selectProdcutsCurrentItem } from "@/features/products/productSlice";
import { useAppSelector } from "@/store/hooks";
import { ProductFormValues } from "@/types/api";
import UrlToFileList from "@/utils/urlToFileList";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const ProductEdit = () => {
  const { record } = useAppSelector(selectProdcutsCurrentItem);

  
  const [productValues, setProductValues] = useState<
  ProductFormValues | undefined
  >(undefined);
  const [loading, setLoading] = useState(true)
  
  if (record === null) return <Navigate to="/products" />;

  useEffect(() => {
    const initializeForm = async () => {
      const fileList = await UrlToFileList(record.images);
      const values: ProductFormValues = {
        name: record.name,
        price: record.price,
        description: record.description,
        quantity: record.quantity,
        category_id: record.category_id,
        images: fileList,
        brand_id: record.brand?.id!,
      };
      setProductValues(values);
      setLoading(false)      
    };
    initializeForm();
  }, []);

  if(loading) return <h1>Loading...</h1>
  
  return <ProductsForm product={productValues} images={record.images} />;
};

