import supabase from "../../utils/supabase";
import { Brand, BrandFormValues, QueryType } from "../../utils/types";

const createBrand = async (brand: BrandFormValues): Promise<Brand | null> => {
	const { data, error } = await supabase.supabase
		.from("brands")
		.insert([brand])
		.select("*")
		.single();

	if (error) {
		console.error("Error creating brand:", error.message);
		return null;
	}

	return data;
};

const getBrands = async (): Promise<Brand[] | null> => {
	const { data, error } = await supabase.supabase.from("brands").select("*");

	if (error) {
		console.error("Error fetching brands:", error.message);
		return null;
	}

	return data;
};

const updateBrand = async (
	brandId: number,
	updatedBrand: Partial<BrandFormValues>,
): Promise<Brand | null> => {
	const { data, error } = await supabase.supabase
		.from("brands")
		.update(updatedBrand)
		.eq("id", brandId)
		.select("*")
		.single();

	if (error) {
		console.error("Error updating brand:", error.message);
		return null;
	}

	return data;
};

const deleteBrand = async (brandId: number): Promise<number | null> => {
	const { error } = await supabase.supabase
		.from("brands")
		.delete()
		.eq("id", brandId);

	if (error) {
		console.error("Error deleting brand:", error.message);
		return null;
	}

	return brandId;
};

const searchBrands = async (query: QueryType<Brand>) => {
	const { count, error: countError } = await supabase.supabase
		.from("brands")
		.select("*", { count: "exact", head: true });
	if (countError) {
		throw new Error(countError.message);
	}
	const { data, error } = await supabase.supabase
		.from("brands")
		.select("*")
		.ilike(`${query.search.query}`, `%${query.search.with}%`)
		.order("created_at", { ascending: false })
		.range(query.pagination.from, query.pagination.to);

	if (error) {
		throw new Error(error.message);
	}

	const response = {
		data: data ? data : [],
		count: count ? count : 0,
	};
	return response;
};

export { deleteBrand, createBrand, updateBrand, getBrands, searchBrands };
