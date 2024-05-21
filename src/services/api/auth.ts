import supabase from "../../utils/supabase";
import { LoginFormValues, SignUpFormValues } from "../../utils/types";

const createNewUserEmailPass = async (newUser: SignUpFormValues) => {
  const { data, error } = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      data: {
        name: newUser.name,
        user_role: "USER",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const loginUserWithEmailPass = async (user: LoginFormValues) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export { createNewUserEmailPass, loginUserWithEmailPass, signOut };
