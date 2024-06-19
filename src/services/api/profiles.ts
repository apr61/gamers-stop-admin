import supabase from "../../utils/supabase";
import { CustomUser, USER_ROLE } from "@/types/api";
import errorHandler from "../errorHandler";

const getProfiles = async () => {
  const { data, error } = await supabase()
    .from("profiles")
    .select("*, user_role: user_roles(role), addresses: addresses(*)");

  if (error) return errorHandler(error);

  const users_with_roles = data.map((d) => {
    return {
      ...d,
      user_role: d.user_role[0].role as USER_ROLE,
    };
  });

  return users_with_roles as CustomUser[];
};

const searchProfiles = async () => {
  const { count, error: countError } = await supabase()
    .from("profiles")
    .select("*", { count: "exact", head: true });

  if (countError) return errorHandler(countError);

  const { data, error } = await supabase()
    .from("profiles")
    .select("*, user_role: user_roles(role), addresses: addresses(*)");

  if (error) return errorHandler(error);
  const users_with_roles = data.map((d) => {
    return {
      ...d,
      user_role: d.user_role[0].role as USER_ROLE,
    };
  });
  return {
    data: users_with_roles as CustomUser[],
    count: count ? count : 0,
  };
};

const getProfileById = async (userId: string) => {
  const { data, error } = await supabase()
    .from("profiles")
    .select("*, user_role: user_roles(role), addresses: addresses(*)")
    .eq("id", userId)
    .single();
  if (error) return errorHandler(error);
  return data;
};

export { getProfileById, getProfiles, searchProfiles };
