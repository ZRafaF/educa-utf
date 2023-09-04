// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import "./globals.css";
import type { Metadata } from "next";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./contexts/AuthProvider";
import AppOverlay from "./components/AppOverlay/AppOverlay";

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
			<body style={{ margin: 0 }}>
				<ToastProvider>
					<AuthProvider>
						<AppOverlay>{children}</AppOverlay>
					</AuthProvider>
				</ToastProvider>
			</body>
		</html>
	);
}
