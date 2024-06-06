import { useEffect } from "react";
import CrudLayout from "../../layout/CrudLayout";
import {
	brandSearch,
	removeBrand,
	resetBrandCurrentItem,
	selectBrandCurrentItem,
	selectBrands,
	selectBrandsSearch,
	setBrandCurrentItem,
} from "../../redux/slice/brandsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { columns, readItem } from "./config";
import { Brand, CrudConfig, QueryType } from "../../utils/types";
import BrandForm from "../../components/forms/BrandForm";
import { openDrawer } from "../../redux/slice/uiActionsSlice";

const Brands = () => {
	const { data, error, status } = useAppSelector(selectBrands);
	const { data: searchData, totalItems } = useAppSelector(selectBrandsSearch);
	const {
		record,
		error: currentError,
		status: currentStatus,
		action,
	} = useAppSelector(selectBrandCurrentItem);

	const setCurrentItemFn = (
		action: "read" | "update" | "delete",
		record: Brand,
	) => {
		dispatch(setBrandCurrentItem({ action, record }));
		dispatch(openDrawer());
	};

	const searchFn = (query: QueryType<Brand>) => {
		dispatch(brandSearch(query));
	};

	const deleteFn = async (record: Brand) => {
		await dispatch(removeBrand(record.id));
	};

	const resetEntityStateFn = () => {
		dispatch(resetBrandCurrentItem());
	};

	const config: CrudConfig<Brand> = {
		DATA_TABLE_TITLE: "Brand list",
		DRAWER_TITLE: "Brand",
		ADD_NEW_ITEM: "Add new brand",
		TABLE_NAME: "brands",
		search: "brand_name",
		columns: columns,
		readItem: readItem,
		entity: {
			entityData: {
				data,
				search: { data: searchData, totalItems },
				status,
				error,
			},
			current: {
				action,
				record: record,
				error: currentError,
				status: currentStatus,
			},
			searchFn,
			deleteFn,
			resetEntityStateFn,
			setCurrentItemFn,
		},
	};

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(resetBrandCurrentItem());
	}, [dispatch]);
	console.log(searchData);
	return <CrudLayout config={config} Form={BrandForm} />;
};

export default Brands;
