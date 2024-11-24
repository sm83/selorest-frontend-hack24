"use client";

import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

interface IContext {
	isAuth: boolean;
	setIsAuth: Dispatch<SetStateAction<boolean>>;
	token: string;
	setToken: Dispatch<SetStateAction<string>>;
	userId: string;
	setUserId: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuth, setIsAuth] = useState(false);
	const [token, setToken] = useState<string>("");
	const [userId, setUserId] = useState<string>("");

	const value = useMemo(
		() => ({
			isAuth,
			setIsAuth,
			token,
			setToken,
			userId,
			setUserId,
		}),
		[isAuth, token, userId]
	);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const lsToken = localStorage.getItem("token");
			const lsUserId = localStorage.getItem("user-id");

			setToken(lsToken as string);
			setUserId(lsUserId as string);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
