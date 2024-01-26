// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import React from 'react';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import {
	ArticlesResponse,
	ChaptersResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import { ChaptersExpand } from '@/types/expanded-types';
import {
	getChapterById,
	getChapterCoverURL,
	getChaptersStatsById,
} from '@/lib/apiHelpers/chaptersAPI';
import { toast } from 'react-toastify';
import PageMessage from '@/components/PageMessage/PageMessage';
import Container from '@mui/material/Container';
import { usePathname, useSearchParams } from 'next/navigation';
import ArticlesList from './ArticlesList/ArticlesList';
import ChapterInspectorHeader from './ChapterInspectorHeader/ChapterInspectorHeader';

interface ChapterInspectorProps {
	chapterId: string;
}

const ChapterInspector: FunctionComponent<ChapterInspectorProps> = ({
	chapterId,
}) => {
	const [chapter, setChapter] = useState<ChaptersResponse<ChaptersExpand>>();
	const [chapterStats, setChapterStats] = useState<ChaptersStatsResponse>();
	const [loading, setLoading] = useState<boolean>(true);
	const pathname = usePathname();
	const paths = pathname.split('/');
	const [articles, setArticles] = useState<ArticlesResponse[]>(
		chapter?.expand?.articles ?? []
	);
	const searchParams = useSearchParams();
	const editMode = Boolean(searchParams.get('edit'));

	useEffect(() => {
		const handleFetchData = async () => {
			try {
				const [chapterResponse, chapterStatsResponse] =
					await Promise.all([
						getChapterById(chapterId, true),
						getChaptersStatsById(chapterId),
					]);
				setChapter(chapterResponse);
				setChapterStats(chapterStatsResponse);
				setArticles(chapterResponse.expand?.articles ?? []);
			} catch (error) {
				toast.error('Erro ao carregar capítulo ' + error);
				console.error(error);
			}
			setLoading(false);
		};

		handleFetchData();
	}, [chapterId]);

	if (loading) return <PageMessage message="Carregando..." loading pt={4} />;

	if (chapter === undefined || chapterStats === undefined)
		return (
			<Typography fontWeight={500}>
				Falha ao carregar capítulo.
			</Typography>
		);

	return (
		<>
			<ChapterInspectorHeader
				chapter={chapter}
				chapterStats={chapterStats}
				editMode={editMode}
			/>
			<Box bgcolor="grey.A700">
				<Container maxWidth="sm" disableGutters>
					<ArticlesList
						articles={articles}
						setArticles={setArticles}
						chapter={chapter}
						paths={paths}
						editMode={editMode}
					/>
				</Container>
			</Box>
		</>
	);
};

export default ChapterInspector;
