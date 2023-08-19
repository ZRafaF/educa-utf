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
