// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import "./globals.css";
import type { Metadata } from "next";
import ToastProvider from "@/app/components/ToastProvider/ToastProvider";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./contexts/AuthProvider";

export const metadata: Metadata = {
	title: "Educa UTF",
	description: "Web aplicação feita por alunos para alunos.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body>
				<ToastProvider>
					<AuthProvider>{children}</AuthProvider>
				</ToastProvider>
			</body>
		</html>
	);
}
