// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import {
	ArticlesResponse,
	ArticlesStatsResponse,
} from '@/types/pocketbase-types';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FunctionComponent, useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import { useDebounce } from 'use-debounce';
import { extractArticleId, slugify } from '@/lib/helper';
import {
	getArticleById,
	getListOfArticlesStats,
} from '@/lib/apiHelpers/articlesAPI';
import { toast } from 'react-toastify';
import ArticleCard from '../ArticleCard/ArticleCard';
import { ArticlesExpand } from '@/types/expanded-types';
import CardActionArea from '@mui/material/CardActionArea';
import Paper from '@mui/material/Paper';
import { ListResult } from 'pocketbase';
import usePbAuth from '@/hooks/usePbAuth';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import { Tooltip } from '@mui/material';

interface ArticleSelectorProps {
	callback: (article: ArticlesResponse) => void;
}

const ArticleSelector: FunctionComponent<ArticleSelectorProps> = ({
	callback,
}) => {
	const [userInput, setUserInput] = useState('');
	const [debouncedInput] = useDebounce(userInput, 300);
	const [, user] = usePbAuth();
	const [onlyMyArticles, setOnlyMyArticles] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [listResult, setListResult] =
		useState<ListResult<ArticlesStatsResponse<ArticlesExpand>>>();

	const [filter, setFilter] = useState('');

	const hasPrevious = listResult?.page !== 1;
	const hasNext = listResult?.page !== listResult?.totalPages;

	useEffect(() => {
		setCurrentPage(1);
	}, [filter]);

	useEffect(() => {
		const fetchArticles = async () => {
			setLoading(true);

			const articlesResult = await getListOfArticlesStats(
				currentPage,
				5,
				{
					sort: '+slug',
					filter: filter,
				}
			);
			setListResult(articlesResult);
		};

		try {
			fetchArticles();
		} catch (error) {
			toast.error('Erro ao buscar artigos');
			console.error('Error fetching articles:', error);
		} finally {
			setLoading(false);
		}
	}, [filter, currentPage]);

	useEffect(() => {
		const extractedId = extractArticleId(debouncedInput);
		const searchValue = extractedId ? extractedId : slugify(debouncedInput);
		const newFilter = `(slug~'%${searchValue}%' || id='${searchValue}') ${
			onlyMyArticles ? `&& user='${user?.id}'` : ''
		}`;
		setFilter((old) => {
			if (newFilter !== old) {
				setCurrentPage(1);
				return newFilter;
			}
			return old;
		});
	}, [debouncedInput, onlyMyArticles, user]);

	const fetchCallbackArticle = async (
		articleStats: ArticlesStatsResponse
	) => {
		const article = await getArticleById(articleStats.id);
		callback(article);
	};

	return (
		<Stack spacing={1}>
			<TextField
				label="Titulo, ID ou URL do Artigo"
				variant="outlined"
				helperText="Insira um título, ID ou URL do artigo que deseja adicionar ao capítulo."
				fullWidth
				value={userInput}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					setUserInput(event.target.value);
					setLoading(true);
				}}
				InputProps={{
					endAdornment: loading ? (
						<InputAdornment position="end">
							<CircularProgress color="inherit" size={20} />
						</InputAdornment>
					) : (
						<InputAdornment position="end">
							<CheckIcon
								color="success"
								sx={{
									animation: 'fadeinout 1s ease forwards',
									'@keyframes fadeinout': {
										'0%': {
											opacity: 0,
											transform: 'scale(0)',
										},
										'25%': {
											opacity: 1,
											transform: 'scale(1)',
										},
										'80%': {
											opacity: 1,
											transform: 'scale(1)',
										},
										'100%': {
											opacity: 0,
											transform: 'scale(0)',
										},
									},
								}}
							/>
						</InputAdornment>
					),
				}}
			/>

			<FormControl component="fieldset">
				<FormGroup row>
					<FormControlLabel
						value="bottom"
						control={
							<Checkbox
								sx={{
									ml: 2,
								}}
								onChange={(e) => {
									setLoading(true);
									setOnlyMyArticles(e.target.checked);
								}}
								checked={onlyMyArticles}
							/>
						}
						label="Mostrar apenas meus artigos"
					/>
				</FormGroup>
			</FormControl>
			<Paper
				variant="outlined"
				sx={{
					p: 1,
					borderRadius: 2,
					minHeight: 250,
				}}
			>
				{listResult === undefined || listResult.totalPages === 0 ? (
					<Typography
						variant="body2"
						color="text.secondary"
						textAlign={'center'}
					>
						Nenhum artigo encontrado...
					</Typography>
				) : (
					<>
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
												setLoading(true);
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
												setLoading(true);
											}
										}}
										disabled={!hasNext}
									>
										<KeyboardArrowRightIcon fontSize="inherit" />
									</IconButton>
								</Tooltip>
							</Stack>
						</Stack>
						<Stack direction="column" spacing={1}>
							{listResult.items.map((article) => {
								return (
									<CardActionArea
										key={`article_selector_${article.id}`}
										onClick={() => {
											fetchCallbackArticle(article);
										}}
									>
										<ArticleCard
											myArticle={article}
											hideMoreOptions
											disabled
										/>
									</CardActionArea>
								);
							})}
						</Stack>
					</>
				)}
			</Paper>
		</Stack>
	);
};

export default ArticleSelector;
