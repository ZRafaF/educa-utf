// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import { Metadata } from 'next/types';
import Box from '@mui/material/Box';
import { getChapterById } from '@/lib/apiHelpers/chaptersAPI';
import EditMetadataContent from '@/components/EditMetadata/EditMetadataContent';

// import dynamic from 'next/dynamic';
// const EditArticle = dynamic(
// 	() => import('@/components/EditArticle/EditArticle'),
// 	{
// 		ssr: false,
// 	}
// );

interface PageProps {
	params: { chapterId: string };
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const chapterId = params.chapterId;

	try {
		const chapter = await getChapterById(chapterId);
		let tag = chapter.expand?.tag?.name ?? '';
		return {
			title: `Editar capitulo (${chapter.title}) - EducaUTF`,
			description: 'Edite seu capítulo do EducaUTF',
			applicationName: 'EducaUTF',

			robots: 'noindex,nofollow',
			keywords: ['EducaUTF', 'Educa UTF', 'edit', chapter.title, tag],
		};
	} catch (error) {
		return {
			title: 'Editar capítulo - EducaUTF',
			description: 'Editar capítulo - EducaUTF',
		};
	}
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const chapterId = params.chapterId;
	return (
		<Box
			sx={{
				py: 4,
				flexGrow: 1,
				px: { sm: 0, md: 2, lg: 3 },
				paddingRight: 1,
			}}
		>
			Editando {chapterId}
			<EditMetadataContent overrideType="chapter" />
		</Box>
	);
};

export default Page;
