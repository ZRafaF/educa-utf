// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	getListOfUsersStats,
	getUserAvatarUrl,
	getUsersStatsByUsername,
} from '@/lib/apiHelpers/usersAPI';
import { FunctionComponent } from 'react';
import Box from '@mui/material/Box/Box';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getFormattedDate } from '@/lib/helper';
const EditablePfp = dynamic(
	() => import('@/components/EditablePfp/EditablePfp'),
	{
		ssr: false,
	}
);

const NoSSRPrivateUserComponent = dynamic(
	() => import('./PrivateUserComponent'),
	{
		ssr: false,
	}
);

interface PageProps {
	params: {
		username: string;
	};
}

export const revalidate = 60;

export async function generateStaticParams() {
	const result = await getListOfUsersStats();

	return result.map((user) => ({
		username: user.username,
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	try {
		const userStats = await getUsersStatsByUsername(params.username);
		const userAvatarUrl = await getUserAvatarUrl(userStats);
		return {
			title: `${userStats.username} (${userStats.name})  - EducaUTF`,
			description: `Perfil do ${userStats.username}: ${userStats.description}`,
			applicationName: 'EducaUTF',
			authors: [{ name: userStats.name }],
			openGraph: {
				title: userStats.username,
				description: `Perfil do ${userStats.username}`,
				siteName: 'EducaUTF',
				images: [{ url: userAvatarUrl }],
				locale: 'pt_BR',
				type: 'website',
			},
		};
	} catch (error) {
		return {
			title: 'Perfil',
		};
	}
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const userStats = await getUsersStatsByUsername(params.username);

	return (
		<Box display={'flex'} width={'100%'} minHeight="100dvh">
			<Box width={'100%'}>
				<Container
					maxWidth="md"
					sx={{
						px: { xs: 0.5, sm: 1, md: 2 },
					}}
				>
					<Box
						display={'flex'}
						flexGrow={2}
						py={{ xs: 0.5, sm: 1, md: 2 }}
						gap={2}
						alignItems={'center'}
					>
						<EditablePfp userStats={userStats} />
						<Box>
							<Typography
								variant="h3"
								fontSize={{ xs: 'xx-large', sm: 'xxx-large' }}
								component="h1"
								color="primary"
								fontWeight={700}
							>
								{userStats.name}
							</Typography>
							<Typography
								color="text.secondary"
								variant="subtitle2"
								component="p"
							>
								{userStats.description}
							</Typography>
						</Box>
					</Box>
				</Container>
				<Box
					display={'flex'}
					flexDirection={'column'}
					pl={2}
					gap={2}
					alignItems={'center'}
					bgcolor={'grey.A700'}
				>
					<Container
						maxWidth="md"
						sx={{ py: 2, px: { xs: 0.5, sm: 1, md: 2 } }}
					>
						<Typography>
							<b>INFORMAÇÕES:</b>
						</Typography>
						<Box display={'flex'} pt={1} gap={1} flexWrap={'wrap'}>
							<Typography
								color="text.secondary"
								variant="subtitle2"
								component="p"
							>
								Juntou-se em:{' '}
								<b>{getFormattedDate(userStats.created)}</b>
							</Typography>
							{' | '}
							<Typography
								color="text.secondary"
								variant="subtitle2"
								component="p"
							>
								Visualizações:{' '}
								<b>
									{userStats.n_of_articles_views +
										userStats.n_of_chapters_views}
								</b>
							</Typography>
							{' | '}
							<Typography
								color="text.secondary"
								variant="subtitle2"
								component="p"
							>
								Likes:{' '}
								<b>
									{userStats.n_of_articles_likes +
										userStats.n_of_chapters_likes}
								</b>
							</Typography>
							{' | '}
							<Typography
								color="text.secondary"
								variant="subtitle2"
								component="p"
							>
								Artigos: <b>{userStats.n_of_articles}</b>
							</Typography>
							{' | '}
							<Typography
								color="text.secondary"
								variant="subtitle2"
								component="p"
							>
								Capítulos: <b>{userStats.n_of_chapters}</b>
							</Typography>
						</Box>
					</Container>
				</Box>
			</Box>
			<NoSSRPrivateUserComponent username={params.username} />
		</Box>
	);
};

export default Page;
