// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
"use client";

import { FunctionComponent, ReactNode } from "react";
import pb from "@/lib/PocketBase/pocketbase";
import Box from "@mui/material/Box";
//import { toast } from "react-toastify";

interface LoginFormSenderProps {
	children: ReactNode;
}

const LoginFormSender: FunctionComponent<LoginFormSenderProps> = ({
	children,
}) => {
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitEmail = data.get("email")?.toString();
		const submitPassword = data.get("password")?.toString();
		const submitRemember = data.get("remember")?.toString();
		if (submitEmail === undefined) {
			//toast.error("Invalid email.");
			return;
		}
		if (submitPassword === undefined) {
			//toast.error("Invalid password.");
			return;
		}
		console.log(submitEmail);

		if (submitRemember) {
			//setPersistence(auth, browserSessionPersistence);
		}
		// example create data

		pb.collection("users")
			.create({
				email: submitEmail,
				password: submitPassword,
				passwordConfirm: submitPassword,
			})
			.then((record) => {
				// (optional) send an email verification request
				//pb.collection("users").requestVerification(submitEmail);
			});
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
			{children}
		</Box>
	);
};

export default LoginFormSender;
