import AppFooter from '@/components/AppFooter/AppFooter';
import { MIN_FOOTER_HEIGHT, MIN_TOOLBAR_HEIGHT } from '@/lib/helper';
import Box from '@mui/material/Box/Box';
import Toolbar from '@mui/material/Toolbar/Toolbar';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Toolbar />
			<Box
				minHeight={`calc(100vh - ${MIN_FOOTER_HEIGHT} - ${MIN_TOOLBAR_HEIGHT})`}
				display={'flex'}
				flexDirection={'column'}
			>
				{children}
			</Box>
			<AppFooter />
		</>
	);
}
