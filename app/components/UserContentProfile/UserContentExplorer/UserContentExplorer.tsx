// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useMemo, useState } from 'react';
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
import useCurrentBreakpoint from '@/hooks/useCurrentBreakpoint';
import MiniSearchComponent from '@/components/MiniSearchComponent/MiniSearchComponent';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import { slugify } from '@/lib/helper';

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
	const [currentSearch, setCurrentSearch] = useState('');
	const [breakpoint] = useCurrentBreakpoint();

	const articlesPerPage = useMemo(() => {
		switch (breakpoint) {
			case 'xs':
				return 4;
			case 'sm':
				return 6;
			case 'md':
				return 6;
			case 'lg':
				return 12;
			case 'xl':
				return 12;
			default:
				return 12;
		}
	}, [breakpoint]);

	const chaptersPerPage = useMemo(() => {
		switch (breakpoint) {
			case 'xs':
				return 4;
			case 'sm':
				return 6;
			case 'md':
				return 6;
			case 'lg':
				return 8;
			case 'xl':
				return 10;
			default:
				return 9;
		}
	}, [breakpoint]);
	const parsedType = type === 'articles' ? 'Artigos' : 'Capítulos';

	useEffect(() => {
		setCurrentPage(1);
	}, [showPrivate, currentSearch]);

	useEffect(() => {
		const fetchArticles = async () => {
			const sluggedSearch = slugify(currentSearch);

			const filter = `author_username='${username}' 
			${showPrivate ? '' : `&& visibility='public'`} 
			${
				sluggedSearch &&
				`&& (slug~'%${sluggedSearch}%' || description_slug~'%${sluggedSearch}%')`
			}
			`;

			if (type === 'articles') {
				const result = await getListOfArticlesStats(
					currentPage,
					articlesPerPage,
					{
						sort: '-updated',
						filter: filter,
					}
				);
				setListResult(result);
			} else {
				const result = await getListOfChaptersStats(
					currentPage,
					chaptersPerPage,
					{
						sort: '-updated',
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
	}, [
		showPrivate,
		currentPage,
		username,
		type,
		articlesPerPage,
		chaptersPerPage,
		currentSearch,
	]);

	return (
		<>
			<Box>
				<Stack direction="row" gap={1} alignItems={'end'}>
					<Typography variant="h5" fontWeight={700}>
						{parsedType}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						ordenados por data de atualização
					</Typography>
				</Stack>
				<Grid
					container
					spacing={1}
					sx={{
						justifyContent: 'space-between',
					}}
					alignItems={'center'}
					px={{
						xs: 0,
						sm: 1,
						md: 1,
					}}
					py={0.5}
				>
					<Grid xs={12} sm={8} md={6}>
						<MiniSearchComponent
							currentSearch={currentSearch}
							setCurrentSearch={setCurrentSearch}
							debounceTime={250}
						/>
					</Grid>
					<Grid
						xs={12}
						sm={12}
						md={6}
						container
						spacing={1}
						justifyContent={'space-between'}
					>
						<Grid xs={7} md={6}>
							{user?.username === username && (
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												checked={showPrivate}
												onChange={(e) => {
													setShowPrivate(
														e.target.checked
													);
												}}
											/>
										}
										label="Mostrar privados"
									/>
								</FormGroup>
							)}
						</Grid>
						<Grid xs={5} md={6}>
							{listResult !== undefined &&
								listResult.totalPages > 0 && (
									<Stack
										direction="row"
										justifyContent="end"
										alignItems="center"
										spacing={1}
									>
										<Typography variant="body2">
											Página {currentPage} de{' '}
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
															setCurrentPage(
																currentPage - 1
															);
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
															setCurrentPage(
																currentPage + 1
															);
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
						</Grid>
					</Grid>
				</Grid>
			</Box>
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
