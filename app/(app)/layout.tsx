import AppFooter from '@/components/AppFooter/AppFooter';
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar/Toolbar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Box
				minHeight="100vh"
				display={'flex'}
				flexDirection={'column'}
				mt={{ xs: 7, sm: 8 }}
			>
				<Toolbar />

				{children}
			</Box>
			<AppFooter />
		</>
	);
}
