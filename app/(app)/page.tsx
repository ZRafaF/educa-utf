import BestChapters from './BestChapters';
import { Suspense } from 'react';
import Box from '@mui/material/Box/Box';
import BannerSomethingNew from '@/components/BannerSomethingNew/BannerSomethingNew';
import BestArticles from './BestArticles';
import Divider from '@mui/material/Divider/Divider';
import { Metadata } from 'next/types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import DummyCard from '@/components/DummyCard/DummyCard';

export const revalidate = 60;

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
	const dummyArrayChapters: number[] = Array(10).fill(1);
	const dummyArrayArticles: number[] = Array(12).fill(1);

	return (
		<Box>
			<Suspense fallback={<Box>Carregando...</Box>}>
				<BannerSomethingNew />
			</Suspense>
			<Divider variant="middle" sx={{ mx: 0 }} />

			<Box mx={{ xs: 2, sm: 2, md: 4, lg: 10, xl: 20 }} my={3} gap={4}>
				<Box>
					<Typography variant="h5" fontWeight={700} pb={3}>
						Os melhores artigos do mês
					</Typography>
					<Grid
						container
						spacing={1}
						sx={{
							justifyContent: {
								xs: 'start',
								sm: 'start',
								lg: 'start',
							},
						}}
					>
						<Suspense
							fallback={dummyArrayChapters.map((_, idx) => (
								<Grid
									key={`dummy_chapter_${idx}`}
									xs={6}
									sm={4}
									md={4}
									lg={3}
									xl={2.4}
								>
									<DummyCard type="chapter" />
								</Grid>
							))}
						>
							<BestChapters />
						</Suspense>
					</Grid>
				</Box>
				<Divider
					sx={{
						my: 2,
					}}
					variant="middle"
				/>
				<Box>
					<Typography variant="h5" fontWeight={700} pb={3}>
						Os melhores artigos do mês
					</Typography>
					<Grid
						container
						spacing={1}
						sx={{
							justifyContent: {
								xs: 'start',
								sm: 'start',
								lg: 'start',
							},
						}}
					>
						<Suspense
							fallback={dummyArrayArticles.map((_, idx) => (
								<Grid
									key={`dummy_articles_${idx}`}
									xs={15}
									sm={6}
									md={6}
									lg={4}
									xl={4}
								>
									<DummyCard type="article" />
								</Grid>
							))}
						>
							<BestArticles />
						</Suspense>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
}
