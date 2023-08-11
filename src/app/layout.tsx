import AppHeader from "@/components/AppHeader/AppHeader";
import "./globals.css";
import type { Metadata } from "next";

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
				<AppHeader />
				{children}
			</body>
		</html>
	);
}
