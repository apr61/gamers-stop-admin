import supabase from "../../utils/supabase";
import { LoginFormValues, SignUpFormValues } from "../../utils/types";
import errorHandler from "../errorHandler";

const createNewUserEmailPass = async (newUser: SignUpFormValues) => {
  const { data, error } = await supabase().auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      data: {
        full_name: newUser.full_name,
        user_role: "USER",
        avatar_url: "",
        phone: newUser.phone,
      },
    },
  });
  if (error) {
    return errorHandler(error.message, error.status);
  }
  return data;
};

const loginUserWithEmailPass = async (user: LoginFormValues) => {
  const { data, error } = await supabase().auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  if (error) {
    return errorHandler(error.message, error.status);
  }
  return data;
};

const signOut = async () => {
  const { error } = await supabase().auth.signOut();
  if (error) {
    return errorHandler(error.message, error.status);
  }
};

export { createNewUserEmailPass, loginUserWithEmailPass, signOut };
