import { getCurrentUser } from "@/services/api/auth";
import { USER_ROLE } from "@/types/api";
import supabase from "@/utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

type AuthState = {
	session: Session | null;
	user_role: USER_ROLE | null;
	isLoading: boolean;
	user: User | null;
};

const authInit: AuthState = {
	session: null,
	user_role: null,
	isLoading: false,
	user: null,
};

export const AuthContext = createContext(authInit);

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [session, setSession] = useState<Session | null>(null);
	const [userRole, setUserRole] = useState<USER_ROLE | null>(null);
	const [isLoading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const handleSession = async () => {
			const {data : {session}, error} = await supabase().auth.getSession();
			console.log(session);
			if (session) {
				const jwt: JwtPayload & { user_role: USER_ROLE } = jwtDecode(
					session.access_token!,
				);
				const user_role = jwt.user_role;
				setUserRole(user_role);
				setUser(session.user);
				setSession(session);
			} else {
				setUserRole(null);
				setUser(null);
				setSession(null);
			}
			setLoading(false);
		};
		handleSession();
	}, []);

	return (
		<AuthContext.Provider
			value={{ session, user_role: userRole, isLoading, user }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
