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
	getListOfChapters,
} from '@/lib/apiHelpers/chaptersAPI';
import type { Metadata } from 'next';

export const revalidate = 30;

export async function generateStaticParams() {
	const chapters = await getListOfChapters();

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
		let tags = chapter.expand?.tags.map((tag) => tag.name);
		if (tags === undefined) tags = [''];
		return {
			title: chapter.title,
			description: chapter.description,
			applicationName: 'EducaUTF',
			authors: [{ name: chapterStats.author_name }],
			keywords: ['EducaUTF', 'capitulo', chapter.title, ...tags],
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
		<Grid container flexGrow={1}>
			<ArticlesList chapterId={params.chapterId} />
			<Grid xs>{children}</Grid>
		</Grid>
	);
}
