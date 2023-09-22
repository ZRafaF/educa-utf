import BestArticles from './BestArticles';
import { Suspense } from 'react';
import Box from '@mui/material/Box/Box';
import BannerSomethingNew from '@/components/BannerSomethingNew/BannerSomethingNew';
import BestChapters from './BestChapters';
import Divider from '@mui/material/Divider/Divider';

export const revalidate = 30;

export default function Home() {
	return (
		<Box>
			<Suspense fallback={<Box>Carregando...</Box>}>
				<BannerSomethingNew />
			</Suspense>

			<Box mx={{ xs: 2, sm: 2, md: 4, lg: 10, xl: 20 }} mb={3} gap={4}>
				<Suspense fallback={<Box>Carregando...</Box>}>
					<BestArticles />
				</Suspense>
				<Divider
					sx={{
						my: 2,
					}}
					variant="middle"
				/>
				<Suspense fallback={<Box>Carregando...</Box>}>
					<BestChapters />
				</Suspense>
			</Box>
		</Box>
	);
}
