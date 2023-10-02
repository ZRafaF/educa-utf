// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	getListOfUsersStats,
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

		return {
			title: userStats.username,
			description: userStats.description,
			applicationName: 'EducaUTF',
			authors: [{ name: userStats.name }],
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
