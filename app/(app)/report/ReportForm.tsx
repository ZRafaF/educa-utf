'use client';

import { FormEvent, FunctionComponent, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import TextField from '@mui/material/TextField/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {
	ArticlesStatsResponse,
	ChaptersStatsResponse,
	ReportsTypeOptions,
	UsersStatsResponse,
} from '@/types/pocketbase-types';
import { getUserAvatarUrl, getUsersStatsById } from '@/lib/apiHelpers/usersAPI';
import {
	getArticleById,
	getArticleStatsById,
} from '@/lib/apiHelpers/articlesAPI';
import {
	getChapterCoverURL,
	getChaptersStatsById,
} from '@/lib/apiHelpers/chaptersAPI';

interface ReportFormProps {
	defaultType: ReportsTypeOptions;
	defaultId: string;
	availableTypes: ReportsTypeOptions[];
}

const ReportForm: FunctionComponent<ReportFormProps> = ({
	defaultType,
	defaultId,
	availableTypes,
}) => {
	const [content, setContent] = useState<
		| UsersStatsResponse
		| ArticlesStatsResponse
		| ChaptersStatsResponse
		| undefined
	>();
	const [contentAvatar, setContentAvatar] = useState<string | undefined>();

	const [selectedType, setSelectedType] =
		useState<ReportsTypeOptions>(defaultType);

	const [selectedId, setSelectedId] = useState<string>(defaultId);

	const isInvalidContent =
		content === undefined && selectedType !== ReportsTypeOptions.Outro;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data: FormData = new FormData(e.currentTarget);
		const submitedDescription = data.get('description');
		const submitedType = data.get('type');
		console.log(submitedType);
	};

	useEffect(() => {
		const fetchContent = async () => {
			try {
				switch (selectedType) {
					case ReportsTypeOptions.Usuário:
						const usersResponse = await getUsersStatsById(
							selectedId
						);
						setContent(usersResponse);
						setContentAvatar(getUserAvatarUrl(usersResponse));
						break;
					case ReportsTypeOptions.Artigo:
						const articlesResponse = await getArticleStatsById(
							selectedId
						);
						setContent(articlesResponse);
						setContentAvatar(undefined);
						break;

					case ReportsTypeOptions.Capítulo:
						const chaptersResponse = await getChaptersStatsById(
							selectedId
						);
						setContent(chaptersResponse);
						setContentAvatar(getChapterCoverURL(chaptersResponse));
						break;
					default:
						setContent(undefined);
						setContentAvatar(undefined);
				}
			} catch (error) {
				setContent(undefined);
				setContentAvatar(undefined);
			}
		};

		fetchContent();
	}, [setContent, setContentAvatar, selectedId, selectedType]);

	const reportedContent = () => {
		// switches on content type
		switch (selectedType) {
			case ReportsTypeOptions.Usuário:
				if (!content) return <>Esse usuário não existe!</>;
				const user = content as UsersStatsResponse;
				return <Typography>{user.name}</Typography>;
			case ReportsTypeOptions.Artigo:
				if (!content) return <>Esse artigo não existe!</>;

				const article = content as ArticlesStatsResponse;
				return <Typography>{article.title}</Typography>;

			case ReportsTypeOptions.Capítulo:
				if (!content) return <>Esse capítulo não existe!</>;

				const chapter = content as ChaptersStatsResponse;
				return <Typography>{chapter.title}</Typography>;
			default:
				return <></>;
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Paper
				elevation={0}
				variant="outlined"
				sx={{ mb: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
			>
				<Stack spacing={1}>
					<Typography variant="h6" gutterBottom>
						Informações básicas
					</Typography>
					<Grid container spacing={2}>
						<Grid xs={12} sm>
							<Stack spacing={2}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">
										Tipo
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										label="Tipo"
										name="type"
										required
										defaultValue={defaultType}
										onChange={(e) => {
											setSelectedType(
												e.target
													.value as ReportsTypeOptions
											);
										}}
									>
										{availableTypes.map((type) => {
											console.log(type === defaultType);

											return (
												<MenuItem
													key={type}
													value={type}
												>
													{type}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
								<TextField
									name="id"
									label={`ID`}
									helperText={
										isInvalidContent ? 'ID inválido' : ''
									}
									fullWidth
									autoComplete="id"
									defaultValue={defaultId}
									onChange={(e) => {
										setSelectedId(e.target.value);
									}}
									error={isInvalidContent}
								/>
							</Stack>
						</Grid>
						<Grid xs={12} sm={5} md={4}>
							<Paper
								sx={{
									p: 2,
								}}
								variant="outlined"
							>
								<Stack>{reportedContent()}</Stack>
							</Paper>
						</Grid>

						<Grid xs={12}>
							<TextField
								name="description"
								label={`Descrição...`}
								helperText="Descreva o que há de errado com o conteúdo."
								fullWidth
								multiline
								rows={5}
								autoComplete="description"
							/>
						</Grid>
					</Grid>

					<Stack
						direction={'row'}
						width={'100%'}
						justifyContent={'end'}
						gap={2}
					>
						<Button variant="outlined">Cancelar</Button>
						<Button type="submit" variant="contained">
							Enviar
						</Button>
					</Stack>
				</Stack>
			</Paper>
		</form>
	);
};

export default ReportForm;
