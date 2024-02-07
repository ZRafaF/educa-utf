// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
	ArticlesStatsResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import { ListResult } from 'pocketbase';
import usePbAuth from '@/hooks/usePbAuth';
import { toast } from 'react-toastify';
import { getListOfArticlesStats } from '@/lib/apiHelpers/articlesAPI';
import { getListOfChaptersStats } from '@/lib/apiHelpers/chaptersAPI';
import ChapterCard from '../ChapterCard/ChapterCard';
import { ArticlesExpand, ChaptersExpandTags } from '@/types/expanded-types';
import ArticleCard from '../ArticleCard/ArticleCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const itemsPerPage = 5;

interface UserContentExplorerProps {
	username: string;
	type: 'articles' | 'chapters';
	direction: 'row' | 'column';
}

const UserContentExplorer: FunctionComponent<UserContentExplorerProps> = ({
	username,
	type,
	direction,
}) => {
	const [listResult, setListResult] =
		useState<
			ListResult<
				| ChaptersStatsResponse<ChaptersExpandTags>
				| ArticlesStatsResponse<ArticlesExpand>
			>
		>();
	const [, user] = usePbAuth();
	const [showPrivate, setShowPrivate] = useState(user?.username === username);
	const [currentPage, setCurrentPage] = useState(1);
	const hasPrevious = listResult?.page !== 1;
	const hasNext = listResult?.page !== listResult?.totalPages;

	const parsedType = type === 'articles' ? 'Artigos' : 'Capítulos';

	useEffect(() => {
		setCurrentPage(1);
	}, [showPrivate]);

	useEffect(() => {
		const fetchArticles = async () => {
			const filter = `author_username='${username}' ${
				showPrivate ? '' : `&& visibility='public'`
			}`;
			console.log(filter);

			if (type === 'articles') {
				const result = await getListOfArticlesStats(
					currentPage,
					itemsPerPage,
					{
						sort: '+slug',
						filter: filter,
					}
				);
				setListResult(result);
			} else {
				const result = await getListOfChaptersStats(
					currentPage,
					itemsPerPage,
					{
						sort: '+slug',
						filter: filter,
					}
				);
				setListResult(result);
			}
		};

		try {
			fetchArticles();
		} catch (error) {
			toast.error('Erro ao buscar artigos');
			console.error('Error fetching articles:', error);
		}
	}, [showPrivate, currentPage]);

	const ContentList = (
		<>
			{listResult === undefined ||
				(listResult.totalPages === 0 && (
					<Typography
						variant="body2"
						color="text.secondary"
						textAlign={'center'}
						p={1}
					>
						Nenhum Item encontrado...
					</Typography>
				))}
			{listResult?.items.map((item) => (
				<>
					{type === 'articles' ? (
						<ArticleCard
							key={item.id}
							myArticle={
								item as ArticlesStatsResponse<ArticlesExpand>
							}
						/>
					) : (
						<Box minWidth={250}>
							<ChapterCard
								key={item.id}
								myChapter={
									item as ChaptersStatsResponse<ChaptersExpandTags>
								}
							/>
						</Box>
					)}
				</>
			))}
		</>
	);

	return (
		<>
			<Stack
				spacing={2}
				direction="row"
				justifyContent="space-between"
				alignItems="end"
				pb={2}
			>
				<Box>
					<Typography variant="h5" fontWeight={700}>
						{parsedType}
					</Typography>
					{user?.username === username && (
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										checked={showPrivate}
										onChange={(e) => {
											setShowPrivate(e.target.checked);
										}}
									/>
								}
								label="Mostrar privados"
							/>
						</FormGroup>
					)}
				</Box>

				<>
					{listResult !== undefined && listResult.totalPages > 0 && (
						<Stack
							direction="row"
							justifyContent="end"
							alignItems="center"
							spacing={2}
							mb={2}
						>
							<Typography>
								Página {listResult.page} de{' '}
								{listResult.totalPages}
							</Typography>

							<Stack direction="row" spacing={0.5}>
								<Tooltip
									title="Página anterior"
									arrow
									placement="top"
								>
									<IconButton
										aria-label="previous"
										onClick={() => {
											if (hasPrevious) {
												setCurrentPage(currentPage - 1);
											}
										}}
										disabled={!hasPrevious}
									>
										<KeyboardArrowLeftIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
								<Tooltip
									title="Próxima página"
									arrow
									placement="top"
								>
									<IconButton
										aria-label="previous"
										onClick={() => {
											if (hasNext) {
												setCurrentPage(currentPage + 1);
											}
										}}
										disabled={!hasNext}
									>
										<KeyboardArrowRightIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
							</Stack>
						</Stack>
					)}
				</>
			</Stack>
			<Paper
				variant="outlined"
				sx={{
					mx: { xs: -1, sm: -1, md: -2, lg: 0 },
					p: 1,
					bgcolor: 'grey.A700',
				}}
				square
			>
				<Stack
					direction={direction}
					overflow={'auto'}
					flexWrap={'nowrap'}
					spacing={1}
				>
					{ContentList}
				</Stack>
			</Paper>
		</>
	);
};

export default UserContentExplorer;
