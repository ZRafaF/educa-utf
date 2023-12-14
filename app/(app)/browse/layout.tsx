import QueryBuilder from '@/components/BrowseTables/QueryBuilder/QueryBuilder';
import {
	MIN_FOOTER_HEIGHT,
	MIN_PAGINATION_HEIGHT,
	MIN_TOOLBAR_HEIGHT,
} from '@/lib/helper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Box
				minHeight={`calc(100vh - ${MIN_FOOTER_HEIGHT} - ${MIN_TOOLBAR_HEIGHT} - ${MIN_PAGINATION_HEIGHT})`}
			>
				<QueryBuilder />
				<Divider
					sx={{
						mb: 2,
					}}
					variant="middle"
				/>
				<Container
					sx={{
						my: 2,
						position: 'relative',
					}}
					maxWidth={false}
				>
					{children}
				</Container>
			</Box>
		</>
	);
}
