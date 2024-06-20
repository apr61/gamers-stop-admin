import { Navigate } from "react-router-dom";
import { selectProdcutsCurrentItem } from "@/features/products/productSlice";
import { useAppSelector } from "@/store/hooks";
import ProductPreviewImage from "@/components/ProductImagePreview";
import { currencyFormatter } from "@/utils/currencyFormatter";

export const Product = () => {
  const { record } = useAppSelector(selectProdcutsCurrentItem);
  if (record === null) return <Navigate to="/products" />;
  return (
    <div className="w-full p-4 rounded-md flex flex-col md:flex-row gap-12">
      <ProductPreviewImage images={record.images} name={record.name} />
      <div className="w-full bg-dimBlack p-4  rounded-md">
        <header>
          <h1 className="text-2xl font-bold">{record.name}</h1>
          <div className="flex gap-4">
            <p>{record.brand?.brand_name}</p>
            <p>
              <span className="text-gray-700 dark:text-slate-400 font-semibold">
                Published :{" "}
              </span>
              {new Date(record.created_at).toLocaleDateString()}
            </p>
          </div>
        </header>
        <p className="text-xl font-bold my-4">
          {currencyFormatter(record.price)}
        </p>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Description :
          </h3>
          <p>{record.description}</p>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Services :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
        <section className="my-4 w-full">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Specification :
          </h3>
          <div className="border border-border rounded-sm p-4 my-2">
            <table className="w-full border-collapse table-auto">
              <tbody>
                <tr className="border-b border-border">
                  <th className="text-start p-2">Category</th>
                  <td className="p-2">{record.category?.category_name}</td>
                </tr>
                <tr className="border-b border-border">
                  <th className="text-start p-2">Brand</th>
                  <td className="p-2">{record.brand?.brand_name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Ratings and reviews :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Ratings and reviews :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Ratings and reviews :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Ratings and reviews :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Ratings and reviews :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Ratings and reviews :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Ratings and reviews :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
        <section className="my-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-400">
            Ratings and reviews :
          </h3>
          <ul>
            <li>10 days replacement</li>
            <li>Cash on delivery available</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
