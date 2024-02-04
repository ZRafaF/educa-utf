// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useMemo, useState } from 'react';
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
	getChaptersStatsById,
} from '@/lib/apiHelpers/chaptersAPI';
import { toast } from 'react-toastify';
import PageMessage from '@/components/PageMessage/PageMessage';
import Container from '@mui/material/Container';
import { usePathname, useSearchParams } from 'next/navigation';
import ArticlesList from './ArticlesList/ArticlesList';
import ChapterInspectorHeader from './ChapterInspectorHeader/ChapterInspectorHeader';
import usePbAuth from '@/hooks/usePbAuth';
import useIsChapterEditMode from '@/hooks/useIsChapterEditMode';
import ArticleCoverProvider from '@/contexts/ArticleCoverContext';
import ChapterEditSender from './ChapterEditSender';

interface ChapterInspectorProps {
	chapterId: string;
}

const ChapterInspector: FunctionComponent<ChapterInspectorProps> = ({
	chapterId,
}) => {
	const [chapter, setChapter] = useState<ChaptersResponse<ChaptersExpand>>();
	const [editedChapter, setEditedChapter] =
		useState<ChaptersResponse<ChaptersExpand>>();
	const [chapterStats, setChapterStats] = useState<ChaptersStatsResponse>();
	const [loading, setLoading] = useState<boolean>(true);

	const [editMode] = useIsChapterEditMode();

	const [, user] = usePbAuth();

	useEffect(() => {
		if (chapter && !editMode) {
			setEditedChapter(chapter);
		}
	}, [chapter, editMode]);

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
				setEditedChapter(chapterResponse);
			} catch (error) {
				toast.error('Erro ao carregar capítulo ' + error);
				console.error(error);
			}
			setLoading(false);
		};

		handleFetchData();
	}, [chapterId]);

	if (loading) return <PageMessage message="Carregando..." loading pt={4} />;

	if (
		chapter === undefined ||
		chapterStats === undefined ||
		editedChapter === undefined
	)
		return (
			<Typography fontWeight={500}>
				Falha ao carregar capítulo.
			</Typography>
		);

	return (
		<ArticleCoverProvider>
			<ChapterEditSender editedChapter={editedChapter} chapter={chapter}>
				<ChapterInspectorHeader
					chapter={chapter}
					chapterStats={chapterStats}
					editMode={editMode}
					editedChapter={editedChapter}
					setEditedChapter={setEditedChapter}
				/>

				<Box bgcolor="grey.A700">
					<Container
						maxWidth="sm"
						disableGutters
						sx={{
							minHeight: '50svh',
						}}
					>
						<ArticlesList
							chapter={chapter}
							editMode={editMode}
							editedChapter={editedChapter}
							setEditedChapter={setEditedChapter}
						/>
					</Container>
				</Box>
			</ChapterEditSender>
		</ArticleCoverProvider>
	);
};

export default ChapterInspector;
