import BestChapters from './BestChapters';
import { Suspense } from 'react';
import Box from '@mui/material/Box/Box';
import BannerSomethingNew from '@/components/BannerSomethingNew/BannerSomethingNew';
import BestArticles from './BestArticles';
import Divider from '@mui/material/Divider/Divider';
import { Metadata } from 'next/types';

export const revalidate = 0;

export const metadata: Metadata = {
	title: 'EducaUTF',
	description:
		'Web aplicação para criação e compartilhamento de conteúdo acadêmico. Feito por alunos para o mundo :)',
	keywords: ['EducaUTF', 'Educa UTF', 'artigos', 'estudo', 'UTFPR', 'wiki'],
	openGraph: {
		images: '/icon-256x256.png',
	},
	twitter: {
		images: '/icon-256x256.png',
	},
};

export default function Home() {
	return (
		<Box>
			<Suspense fallback={<Box>Carregando...</Box>}>
				<BannerSomethingNew />
			</Suspense>
			<Divider variant="middle" sx={{ mx: 0 }} />

			<Box mx={{ xs: 2, sm: 2, md: 4, lg: 10, xl: 20 }} my={3} gap={4}>
				<Suspense fallback={<Box>Carregando...</Box>}>
					<BestChapters />
				</Suspense>
				<Divider
					sx={{
						my: 2,
					}}
					variant="middle"
				/>
				<Suspense fallback={<Box>Carregando...</Box>}>
					<BestArticles />
				</Suspense>
			</Box>
		</Box>
	);
}
