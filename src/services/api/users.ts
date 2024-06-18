import { createClient } from "@supabase/supabase-js";
import { User, UserFormData } from "@/types/api";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supbaseSecretKey = import.meta.env.VITE_SUPABASE_SECRET_KEY;

const client = createClient(supabaseUrl, supbaseSecretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const adminAuthlient = () => client.auth.admin;

const listAllUsers = async () => {
  const {
    data: { users },
    error,
  } = await adminAuthlient().listUsers();
  if (error) {
    throw new Error(error.message);
  }
  const usersData = users.map((user) => {
    let customUser: User = {
      email: user.email!,
      full_name: user.user_metadata.full_name,
      user_role: user.user_metadata.user_role,
      phone: user.phone!,
      id: user.id,
      created_at: user.created_at,
      lastLogin: user.last_sign_in_at!,
      last_updated: user.updated_at!,
      avatar_url: user.user_metadata.avatar_url,
    };
    return customUser;
  });
  const response = {
    data: usersData,
    count: usersData.length,
  };
  return response;
};

const updateUser = async (userId: string, updatedData: UserFormData) => {
  // Note: You must be authenticated to update user data.
  const {
    data: { user },
    error,
  } = await adminAuthlient().updateUserById(userId, {
    email: updatedData.email,
    phone: updatedData.phone,
    user_metadata: {
      full_name: updatedData.full_name,
      avatar_url: updatedData.avatar_url,
      phone: updatedData.phone,
      user_role: updatedData.user_role,
    },
  });

  if (error || user === null) {
    return null;
  }

  let customUser: User = {
    email: user.email!,
    full_name: user.user_metadata.full_name,
    user_role: user.user_metadata.user_role,
    phone: user.phone!,
    id: user.id,
    created_at: user.created_at,
    lastLogin: user.last_sign_in_at!,
    last_updated: user.updated_at!,
    avatar_url: user.user_metadata.avatar_url,
  };

  return customUser;
};

const createUser = async (userData: UserFormData) => {
  const {
    data: { user },
    error,
  } = await adminAuthlient().createUser({
    email: userData.email,
    password: "demo@123",
    phone: userData.phone,
    user_metadata: {
      full_name: userData.full_name,
      avatar_url: userData.avatar_url,
      phone: userData.phone,
      user_role: userData.user_role,
    },
  });

  if (error || user === null) {
    throw error;
  }

  let customUser: User = {
    email: user.email!,
    full_name: user.user_metadata.full_name,
    user_role: user.user_metadata.user_role,
    phone: user.phone!,
    id: user.id,
    created_at: user.created_at,
    lastLogin: user.last_sign_in_at!,
    last_updated: user.updated_at!,
    avatar_url: user.user_metadata.avatar_url,
  };

  return customUser;
};

const deleteUser = async (id: string) => {
  const { error } = await adminAuthlient().deleteUser(id);
  if (error) {
    throw error;
  }
  return id;
};

export { listAllUsers, updateUser, createUser, deleteUser };
