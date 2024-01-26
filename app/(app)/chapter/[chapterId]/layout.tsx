// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReactNode, Suspense } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import {
	getChapterById,
	getChaptersStatsById,
	getFullListOfChapters,
} from '@/lib/apiHelpers/chaptersAPI';
import type { Metadata } from 'next';

import dynamic from 'next/dynamic';
import DrawerController from './DrawerController';
import ChapterInspector from '@/components/ChapterInspector/ChapterInspector';
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
		const chapter = await getChapterById(chapterId, true);
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
				<Suspense fallback={<div>Carregando...</div>}>
					<DrawerController>
						<ChapterInspector chapterId={params.chapterId} />
					</DrawerController>
				</Suspense>
				<Grid xs>
					<Suspense fallback={<div>Carregando...</div>}>
						{children}
					</Suspense>
				</Grid>
			</Grid>

			<ViewsBumper
				collectionName="chapters"
				recordId={params.chapterId}
			/>
		</>
	);
}
