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
	ReportsReasonOptions,
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
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import AvatarComponent from '@/components/AvatarComponent/AvatarComponent';
import Tooltip from '@mui/material/Tooltip';
import { createReport } from '@/lib/apiHelpers/reportAPI';
import usePbAuth from '@/hooks/usePbAuth';
import { useRouter } from 'next/navigation';

interface ReportFormProps {
	defaultType: ReportsTypeOptions;
	defaultId: string;
	availableTypes: ReportsTypeOptions[];
	availableReasons: ReportsReasonOptions[];
}

const ReportForm: FunctionComponent<ReportFormProps> = ({
	defaultType,
	defaultId,
	availableTypes,
	availableReasons,
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
	const [, user] = usePbAuth();
	const router = useRouter();

	const isInvalidContent =
		content === undefined && selectedType !== ReportsTypeOptions.Outro;

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isInvalidContent) {
			toast.error('Esse conteúdo não existe! Verifique o ID e o tipo.');
			return;
		}

		createReport({
			type: selectedType,
			reason: e.currentTarget.reason.value,
			description: e.currentTarget.description.value,
			author: user?.id,
			reported_article:
				selectedType === ReportsTypeOptions.Artigo
					? selectedId
					: undefined,
			reported_chapter:
				selectedType === ReportsTypeOptions.Capítulo
					? selectedId
					: undefined,
			reported_user:
				selectedType === ReportsTypeOptions.Usuário
					? selectedId
					: undefined,
		})
			.then(() => {
				toast.success('Report enviado com sucesso!');
				router.push('/');
			})
			.catch((e) => {
				toast.error('Erro ao enviar report!');
				console.error(e);
			});
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
				if (!content)
					return (
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
						>
							Esse usuário não existe!
						</Typography>
					);
				const user = content as UsersStatsResponse;
				return (
					<>
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
							sx={{
								overflow: 'hidden',
								wordBreak: 'break',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 1,
							}}
						>
							Usuário:{' '}
							<Tooltip title={user.username} arrow>
								<Typography
									component="span"
									fontWeight="bold"
									variant="inherit"
									color="primary"
								>
									{user.username}
								</Typography>
							</Tooltip>
						</Typography>
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
							sx={{
								overflow: 'hidden',
								wordBreak: 'break',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 1,
							}}
						>
							Nome:{' '}
							<Tooltip title={user.name} arrow>
								<Typography
									component="span"
									fontWeight="bold"
									variant="inherit"
									color="primary"
								>
									{user.name}
								</Typography>
							</Tooltip>
						</Typography>
						{contentAvatar !== undefined && (
							<Box display={'flex'} gap={1} alignItems={'center'}>
								<Typography
									color="text.secondary"
									variant="subtitle2"
									component="p"
								>
									Avatar:
								</Typography>
								<AvatarComponent
									name={user.name}
									src={contentAvatar}
									size="small"
								/>
							</Box>
						)}
					</>
				);
			case ReportsTypeOptions.Artigo:
				if (!content)
					return (
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
						>
							Esse artigo não existe!
						</Typography>
					);

				const article = content as ArticlesStatsResponse;
				return (
					<>
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
							sx={{
								overflow: 'hidden',
								wordBreak: 'break',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 1,
							}}
						>
							Titulo:{' '}
							<Tooltip title={article.title} arrow>
								<Typography
									component="span"
									fontWeight="bold"
									variant="inherit"
									color="primary"
								>
									{article.title}
								</Typography>
							</Tooltip>
						</Typography>
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
							sx={{
								overflow: 'hidden',
								wordBreak: 'break',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 1,
							}}
						>
							Autor:{' '}
							<Tooltip title={article.author_name} arrow>
								<Typography
									component="span"
									fontWeight="bold"
									variant="inherit"
									color="primary"
								>
									{article.author_name}
								</Typography>
							</Tooltip>
						</Typography>
					</>
				);

			case ReportsTypeOptions.Capítulo:
				if (!content)
					return (
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
						>
							Esse capítulo não existe!
						</Typography>
					);

				const chapter = content as ChaptersStatsResponse;
				return (
					<>
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
							sx={{
								overflow: 'hidden',
								wordBreak: 'break',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 1,
							}}
						>
							Titulo:{' '}
							<Tooltip title={chapter.title} arrow>
								<Typography
									component="span"
									fontWeight="bold"
									variant="inherit"
									color="primary"
								>
									{chapter.title}
								</Typography>
							</Tooltip>
						</Typography>
						<Typography
							color="text.secondary"
							variant="subtitle2"
							component="p"
							sx={{
								overflow: 'hidden',
								wordBreak: 'break',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 1,
							}}
						>
							Autor:{' '}
							<Tooltip title={chapter.author_name} arrow>
								<Typography
									component="span"
									fontWeight="bold"
									variant="inherit"
									color="primary"
								>
									{chapter.author_name}
								</Typography>
							</Tooltip>
						</Typography>
						{contentAvatar !== undefined && (
							<Box display={'flex'} gap={1} alignItems={'center'}>
								<Typography
									color="text.secondary"
									variant="subtitle2"
									component="p"
								>
									Capa:
								</Typography>
								<AvatarComponent
									name={chapter.title}
									src={contentAvatar}
									size="small"
								/>
							</Box>
						)}
					</>
				);
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
						Novo Reporte
					</Typography>
					<Grid container spacing={2}>
						<Grid xs={12} sm>
							<Stack>
								<Grid container spacing={2}>
									<Grid xs={12} sm>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">
												Tipo de conteúdo *
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="Tipo de conteúdo"
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
									</Grid>
									<Grid xs={12} sm>
										<FormControl fullWidth>
											<InputLabel id="reason-select-label">
												Motivo do report *
											</InputLabel>
											<Select
												labelId="reason-select-label"
												id="reason-select"
												label="Motivo do report"
												name="reason"
												required
												defaultValue={
													ReportsReasonOptions.Spam
												}
											>
												{availableReasons.map(
													(type) => {
														return (
															<MenuItem
																key={type}
																value={type}
															>
																{type}
															</MenuItem>
														);
													}
												)}
											</Select>
										</FormControl>
									</Grid>
								</Grid>

								{selectedType !== ReportsTypeOptions.Outro && (
									<TextField
										name="id"
										label={`ID`}
										helperText={
											isInvalidContent
												? 'ID inválido'
												: ''
										}
										fullWidth
										autoComplete="id"
										defaultValue={defaultId}
										onChange={(e) => {
											setSelectedId(e.target.value);
										}}
										sx={{
											mt: 2,
										}}
										error={isInvalidContent}
									/>
								)}
							</Stack>
						</Grid>
						{selectedType !== ReportsTypeOptions.Outro && (
							<Grid xs={12} sm={5} md={4}>
								<Paper
									sx={{
										p: 2,
										bgcolor: 'grey.A700',
									}}
									variant="outlined"
								>
									<Stack spacing={1}>
										{reportedContent()}
									</Stack>
								</Paper>
							</Grid>
						)}

						<Grid xs={12}>
							<TextField
								name="description"
								label={`Descrição...`}
								helperText="Descreva o que há de errado com o conteúdo em até 1024 caracteres."
								fullWidth
								required
								multiline
								rows={5}
								inputProps={{
									maxLength: 1024,
								}}
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
