// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
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
import { ArticlesExpand, ChaptersExpandTags } from '@/types/expanded-types';
import Box from '@mui/material/Box';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InnerContentExplorer from './InnerContentExplorer';

const articlesPerPage = 8;
const chaptersPerPage = 8;

interface UserContentExplorerProps {
	username: string;
	type: 'articles' | 'chapters';
}

const UserContentExplorer: FunctionComponent<UserContentExplorerProps> = ({
	username,
	type,
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
	const hasPrevious = currentPage !== 1;
	const hasNext = currentPage !== listResult?.totalPages;
	const [loading, setLoading] = useState(false);
	const parsedType = type === 'articles' ? 'Artigos' : 'Capítulos';

	useEffect(() => {
		setCurrentPage(1);
	}, [showPrivate]);

	useEffect(() => {
		const fetchArticles = async () => {
			const filter = `author_username='${username}' ${
				showPrivate ? '' : `&& visibility='public'`
			}`;
			if (type === 'articles') {
				const result = await getListOfArticlesStats(
					currentPage,
					articlesPerPage,
					{
						sort: '+slug',
						filter: filter,
					}
				);
				setListResult(result);
			} else {
				const result = await getListOfChaptersStats(
					currentPage,
					chaptersPerPage,
					{
						sort: '+slug',
						filter: filter,
					}
				);
				setListResult(result);
			}
			setLoading(false);
		};
		setLoading(true);
		try {
			fetchArticles();
		} catch (error) {
			toast.error('Erro ao buscar artigos');
			console.error('Error fetching articles:', error);
			setLoading(false);
		}
	}, [showPrivate, currentPage, username, type]);

	return (
		<>
			<Stack
				spacing={1}
				direction="row"
				justifyContent="space-between"
				alignItems="end"
				px={{
					xs: 0,
					sm: 1,
					md: 1,
				}}
				pb={0.5}
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
							spacing={1}
							mb={2}
						>
							<Typography variant="body2">
								Página {currentPage} de {listResult.totalPages}
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
					mx: { xs: -1, sm: -1, md: -1, lg: -1 },
					p: 1,
					bgcolor: 'grey.A700',
					// minHeight: type === 'chapters' ? 590 : 333,
				}}
				square
			>
				<InnerContentExplorer
					listResult={listResult}
					loading={loading}
					type={type}
					nOfDummyElements={
						type === 'chapters' ? chaptersPerPage : articlesPerPage
					}
				/>
			</Paper>
		</>
	);
};

export default UserContentExplorer;
