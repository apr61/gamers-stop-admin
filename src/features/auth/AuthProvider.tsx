import {
  createNewUserEmailPass,
  loginUserWithEmailPass,
} from "@/services/api/auth";
import { LoginFormValues, SignUpFormValues, USER_ROLE } from "@/types/api";
import supabase from "@/utils/supabase";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

type AuthState = {
  session: Session | null;
  user_role: USER_ROLE | null;
  isLoading: boolean;
  status: "idle" | "success" | "failed" | "pending";
  user: User | null;
  logOutFn: () => void;
  loginFn: (data: LoginFormValues) => Promise<void>;
  signUpFn: (data: SignUpFormValues) => Promise<void>;
};

const authInit: AuthState = {
  session: null,
  user_role: null,
  status: "idle",
  isLoading: true,
  user: null,
  logOutFn: () => {},
  loginFn: async () => {},
  signUpFn: async () => {},
};

export const AuthContext = createContext(authInit);

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<USER_ROLE | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<
    "idle" | "success" | "failed" | "pending"
  >("idle");

  const setAuthDetails = (session: Session | null) => {
    if (session) {
      const jwt: JwtPayload & { user_role: USER_ROLE } = jwtDecode(
        session.access_token!
      );
      const user_role = jwt.user_role;
      setUserRole(user_role);
      setUser(session.user);
      setSession(session);
      setStatus("success");
    } else {
      setStatus("failed");
    }
  };

  const resetAuthDetails = () => {
    setUserRole(null);
    setUser(null);
    setSession(null);
  };

  useEffect(() => {
    const handleSession = (event: AuthChangeEvent, session: Session | null) => {
      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        setAuthDetails(session);
      }
      if (event === "SIGNED_OUT") {
        resetAuthDetails();
      }
      setLoading(false);
    };
    supabase().auth.onAuthStateChange(handleSession);
  }, []);

  const logOutFn = () => {
    setStatus("pending");
    setTimeout(async () => {
      await supabase().auth.signOut();
      setStatus("idle");
    }, 1000);
  };

  const loginFn = async (data: LoginFormValues) => {
    setStatus("pending");
    await loginUserWithEmailPass(data);
  };

  const signUpFn = async (data: SignUpFormValues) => {
    setStatus("pending");
    await createNewUserEmailPass(data);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user_role: userRole,
        isLoading,
        user,
        logOutFn,
        loginFn,
        status,
        signUpFn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
