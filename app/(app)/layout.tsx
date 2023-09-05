import AppFooter from "@/components/AppFooter/AppFooter";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			{children}
			<AppFooter />
		</section>
	);
}
