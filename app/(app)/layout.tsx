import AppFooter from "@/components/AppFooter/AppFooter";
import Toolbar from "@mui/material/Toolbar/Toolbar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<Toolbar />

			{children}
			<AppFooter />
		</section>
	);
}
