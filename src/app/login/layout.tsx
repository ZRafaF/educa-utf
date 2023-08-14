// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Metadata } from "next";
import React from "react";
import ToastProvider from "../components/ToastProvider/ToastProvider";
import AuthProvider from "../contexts/AuthProvider";
import AppHeader from "../components/AppHeader/AppHeader";

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ToastProvider>
					<AuthProvider>
						<AppHeader />
						{children}
					</AuthProvider>
				</ToastProvider>
			</body>
		</html>
	);
}
