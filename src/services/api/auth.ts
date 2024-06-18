import supabase from "../../utils/supabase";
import { LoginFormValues, SignUpFormValues } from "@/types/api";
import errorHandler from "../errorHandler";

const createNewUserEmailPass = async (newUser: SignUpFormValues) => {
  const { data, error } = await supabase().auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      data: {
        full_name: newUser.full_name,
        avatar_url: "",
      },
    },
  });
  if (error) {
    return errorHandler(error);
  }
  return data;
};

const loginUserWithEmailPass = async (user: LoginFormValues) => {
  const { data, error } = await supabase().auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  if (error) {
    return errorHandler(error);
  }
  return data;
};

const signOut = async () => {
  const { error } = await supabase().auth.signOut();
  if (error) {
    return errorHandler(error);
  }
};

const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase().auth.getUser();
  if (error) {
    return errorHandler(error.message, error.status);
  }
  return user;
};

export {
  createNewUserEmailPass,
  loginUserWithEmailPass,
  signOut,
  getCurrentUser,
};
