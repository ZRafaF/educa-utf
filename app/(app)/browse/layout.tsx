import AppFooter from '@/components/AppFooter/AppFooter';
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar/Toolbar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Box
			sx={{
				minHeight: '100vh',
			}}
		>
			<Toolbar />
			Browse
			{children}
		</Box>
	);
}
