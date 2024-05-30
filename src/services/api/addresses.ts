import supabase from "../../utils/supabase";
import { Address, AddressFormValues, QueryType } from "../../utils/types";

// Create a new address
const createAddress = async (
  address: AddressFormValues
): Promise<Address> => {
  const { data, error } = await supabase.supabase
    .from("addresses")
    .insert([address])
    .select(`*, user:profiles(*)`)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Get all addresses
const getAddresses = async (): Promise<Address[]> => {
  const { data, error } = await supabase.supabase.from("addresses").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Get address by ID
const getAddressById = async (id: number): Promise<Address> => {
  const { data, error } = await supabase.supabase
    .from("addresses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Update an address
const updateAddress = async (
  id: number,
  address: AddressFormValues
): Promise<Address> => {
  const { data, error } = await supabase.supabase
    .from("addresses")
    .update(address)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Delete an address
const deleteAddress = async (id: number): Promise<void> => {
  const { error } = await supabase.supabase
    .from("addresses")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

// Get addresses by user ID
const getAddressesByUserId = async (userId: string): Promise<Address[]> => {
  const { data, error } = await supabase.supabase
    .from("addresses")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const searchAddresses = async (query: QueryType) => {
  const { count, error: countError } = await supabase.supabase
    .from("addresses")
    .select("*", { count: "exact", head: true });
  if (countError) {
    throw new Error(countError.message);
  }
  const { data, error } = await supabase.supabase
    .from("addresses")
    .select(`*, user:profiles(*)`)
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

export {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  getAddressesByUserId,
  searchAddresses,
};
