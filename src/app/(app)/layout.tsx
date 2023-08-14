import "react-toastify/dist/ReactToastify.css";
import AppHeader from "../components/AppHeader/AppHeader";
import AppDrawer from "../components/AppDrawer/AppDrawer";
import AppOverlay from "../components/AppOverlay/AppOverlay";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<AppOverlay>{children}</AppOverlay>
		</section>
	);
}
