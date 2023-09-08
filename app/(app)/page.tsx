import BestPosts from './BestPosts';
import { Suspense } from 'react';
import Box from '@mui/material/Box/Box';
import BannerSomethingNew from '@/components/BannerSomethingNew/BannerSomethingNew';
import BestChapters from './BestChapters';
import Divider from '@mui/material/Divider/Divider';

export default function Home() {
	return (
		<Box>
			<Suspense fallback={<Box>Carregando...</Box>}>
				<BannerSomethingNew />
			</Suspense>

			<Box mx={{ xs: 2, sm: 2, md: 4, lg: 10, xl: 25 }} mb={3}>
				<Suspense fallback={<Box>Carregando...</Box>}>
					<BestPosts />
				</Suspense>
				<Divider
					sx={{
						my: 10,
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
