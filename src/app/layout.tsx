import "./globals.css";
import type { Metadata } from "next";
import ToastProvider from "@/app/components/ToastProvider/ToastProvider";
import AppHeader from "./components/AppHeader/AppHeader";
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
