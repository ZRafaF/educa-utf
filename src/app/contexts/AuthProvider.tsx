// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import pb from "@/lib/PocketBase/pocketbase";
import { getUser } from "@/lib/dbApi";
import {
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	createContext,
	useState,
} from "react";

export const AuthContext = createContext<
	[string, Dispatch<SetStateAction<string>>]
>(["1 mm", () => {}]);

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
	const [auth, setAuth] = useState<string>("1 mm");
	pb.authStore.onChange(() => {
		console.log(getUser());
	});
	console.log(getUser());
	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
