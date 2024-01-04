// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ArticlesList from './ArticlesList';
import {
	getChapterById,
	getChaptersStatsById,
	getFullListOfChapters,
} from '@/lib/apiHelpers/chaptersAPI';
import type { Metadata } from 'next';

import dynamic from 'next/dynamic';
import DrawerController from './DrawerController';
const ViewsBumper = dynamic(
	() => import('@/components/ViewsBumper/ViewsBumper'),
	{
		ssr: false,
	}
);

export const revalidate = 30;

export async function generateStaticParams() {
	const chapters = await getFullListOfChapters();

	return chapters.map((chapter) => ({
		chapterId: chapter.id,
	}));
}

export async function generateMetadata({
	params,
}: {
	params: { chapterId: string };
}): Promise<Metadata> {
	// read route params
	const chapterId = params.chapterId;

	try {
		const chapterStats = await getChaptersStatsById(chapterId);
		const chapter = await getChapterById(chapterId);
		let tag = chapter.expand?.tag?.name ?? '';
		return {
			title: `${chapter.title} - EducaUTF`,
			description: chapter.description,
			applicationName: 'EducaUTF',
			authors: [{ name: chapterStats.author_name }],
			keywords: ['EducaUTF', 'Educa UTF', 'capitulo', chapter.title, tag],
		};
	} catch (error) {
		return {
			title: 'Capitulo privado',
			description: 'Capitulo privado',
		};
	}
}

export default function Layout({
	params,
	children,
}: {
	params: { chapterId: string };
	children: ReactNode;
}) {
	return (
		<>
			<Grid container flexGrow={1}>
				<DrawerController>
					<ArticlesList chapterId={params.chapterId} />
				</DrawerController>
				<Grid xs>{children}</Grid>
			</Grid>
			<ViewsBumper
				collectionName="chapters"
				recordId={params.chapterId}
			/>
		</>
	);
}
