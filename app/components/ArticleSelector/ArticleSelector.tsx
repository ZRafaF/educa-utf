// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { ArticlesResponse } from '@/types/pocketbase-types';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FunctionComponent, useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography';
import { useDebounce } from 'use-debounce';
import { extractArticleId, slugify } from '@/lib/helper';
import { getListOfArticles } from '@/lib/apiHelpers/articlesAPI';
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

	const [listResult, setListResult] =
		useState<ListResult<ArticlesResponse<ArticlesExpand>>>();

	useEffect(() => {
		const fetchArticles = async () => {
			setLoading(true);

			const extractedId = extractArticleId(debouncedInput);
			const searchValue = extractedId
				? extractedId
				: slugify(debouncedInput);
			const filter = `(slug~'%${searchValue}%' || id='${searchValue}') ${
				onlyMyArticles ? `&& user='${user?.id}'` : ''
			}`;
			console.log(filter);
			const articlesResult = await getListOfArticles(1, 5, {
				sort: '+slug',
				filter: filter,
			});
			setListResult(articlesResult);

			// console.log(articlesResult);
		};

		try {
			fetchArticles();
		} catch (error) {
			toast.error('Erro ao buscar artigos');
			console.error('Error fetching articles:', error);
		} finally {
			setLoading(false);
		}
	}, [debouncedInput, onlyMyArticles]);

	return (
		<Stack spacing={1}>
			<TextField
				label="Titulo, ID ou URL do Artigo"
				variant="outlined"
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
							{/* <Fade in timeout={500}> */}
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
							{/* </Fade> */}
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
						<Stack direction="column" spacing={1}>
							{listResult.items.map((article) => {
								return (
									<CardActionArea>
										<ArticleCard
											myArticle={article}
											hideMoreOptions
											disabled
										/>
									</CardActionArea>
								);
							})}
						</Stack>
						<Stack
							direction="row"
							justifyContent="end"
							alignItems="center"
							spacing={2}
							mt={2}
						>
							<Typography>
								{listResult.page} de {listResult.totalPages}
							</Typography>

							<Stack direction="row" spacing={0.5}>
								<IconButton aria-label="previous">
									<KeyboardArrowLeftIcon fontSize="inherit" />
								</IconButton>
								<IconButton aria-label="previous">
									<KeyboardArrowRightIcon fontSize="inherit" />
								</IconButton>
							</Stack>
						</Stack>
					</>
				)}
			</Paper>
		</Stack>
	);
};

export default ArticleSelector;
