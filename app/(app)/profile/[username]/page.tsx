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

const NoSSREditUserComponent = dynamic(() => import('./EditUserComponent'), {
	ssr: false,
});

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
		<Box>
			Você está na pagina de: {userStats.name}
			<br />
			Usuário: {userStats.username}
			<br />
			Id: {userStats.id}
			<NoSSREditUserComponent username={params.username} />
		</Box>
	);
};

export default Page;
