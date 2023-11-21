import Container from '@mui/material/Container';
import dynamic from 'next/dynamic';

const QueryBuilder = dynamic(
	() => import('@/components/BrowseTables/QueryBuilder'),
	{
		ssr: false,
	}
);

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Container
			sx={{
				minHeight: '100vh',
				my: 2,
			}}
			maxWidth={false}
		>
			<QueryBuilder />

			{children}
		</Container>
	);
}
