// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import {
	ArticlesResponse,
	ArticlesVisibilityOptions,
} from '@/types/pocketbase-types';
import { ArticlesExpand } from '@/types/expanded-types';
import PageMessage from '../PageMessage/PageMessage';
import usePbAuth from '@/hooks/usePbAuth';
import {
	getArticleById,
	getArticleDocumentUrl,
	updateArticle,
} from '@/lib/apiHelpers/articlesAPI';
import Typography from '@mui/material/Typography/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Unstable_Grid2';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import Link from '@mui/material/Link/Link';
import { toast } from 'react-toastify';
import EditMetadataContent from '../EditMetadata/EditMetadataContent';
import { useRouter } from 'next/navigation';
import Stack from '@mui/material/Stack';
import MdEditor from '../MdEditor/MdEditor';
import Box from '@mui/material/Box';
import AttachmentsComponent from './AttachmentsComponent/AttachmentsComponent';

interface EditArticleProps {
	articleId: string;
}

const EditArticle: FunctionComponent<EditArticleProps> = ({ articleId }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [myArticle, setMyArticle] =
		useState<ArticlesResponse<ArticlesExpand>>();
	const [myArticleDocument, setMyArticleDocument] = useState<
		string | undefined
	>(undefined);
	const [, user] = usePbAuth();
	const [accept, setAccept] = useState<boolean>(true);
	const router = useRouter();
	const saveButtonRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		const fetchArticleInfo = async () => {
			const article = await getArticleById(articleId);

			if (article.user === user?.id) {
				const articleDocument = await getArticleDocumentUrl(article);

				setMyArticleDocument(articleDocument);
				setMyArticle(article);
			}
		};
		fetchArticleInfo().finally(() => {
			setLoading(false);
		});
	}, [articleId, user]);

	if (loading) {
		return <PageMessage message="Carregando artigo, aguarde..." loading />;
	} else if (myArticle && myArticleDocument !== undefined) {
		const handleSubmit = async (
			event: React.FormEvent<HTMLFormElement>
		) => {
			event.preventDefault();
			const data: FormData = new FormData(event.currentTarget);
			const submitTitle = data.get('article-title')?.toString();
			const submitTag = data.get('article-tag')?.toString();
			const submitDescription = data
				.get('article-description')
				?.toString();

			const getVis = () => {
				const visibRaw = data
					.get('visibility-radio-buttons')
					?.toString();
				switch (visibRaw) {
					case 'public':
						return ArticlesVisibilityOptions.public;
					case 'private':
						return ArticlesVisibilityOptions.private;

					default:
						return myArticle.visibility;
				}
			};
			const saveAndFinish =
				(event as any).nativeEvent.submitter.name === 'saveAndFinish';

			const submitVisibility = getVis();

			if (submitTitle === undefined) {
				toast.error('Titulo inválido!');
				return;
			}

			if (submitDescription === undefined) {
				toast.error('Descrição inválida');
				return;
			}

			if (user === null) {
				toast.error('Você precisa estar logado!');
				return;
			}
			const id = toast.loading('Fazendo upload do arquivo, aguarde...');

			try {
				const baseFile = new Blob([myArticleDocument], {
					type: 'text/markdown',
				});

				const updatedRecord = await updateArticle(
					myArticle?.id,
					{
						title: submitTitle,
						user: user.id,
						description: submitDescription,
						visibility: submitVisibility,
						document: '',
					},
					baseFile
				);

				toast.update(id, {
					render: 'Artigo atualizado com sucesso!',
					type: 'success',
					isLoading: false,
					autoClose: 5000,
					pauseOnFocusLoss: true,
					draggable: true,
					pauseOnHover: true,
					closeOnClick: true,
				});
				if (saveAndFinish) router.push(`/article/${updatedRecord.id}`);
			} catch (error) {
				if (error instanceof Error) {
					console.error(error);
					switch (error.message) {
						case 'Failed to create record.':
							toast.update(id, {
								render: 'Falha ao salvar o artigo!',
								type: 'error',
								isLoading: false,
								autoClose: 5000,
								pauseOnFocusLoss: true,
								draggable: true,
								pauseOnHover: true,
								closeOnClick: true,
							});

							break;

						default:
							toast.update(id, {
								render: 'Algo deu errado!',
								type: 'error',
								isLoading: false,
								autoClose: 5000,
								pauseOnFocusLoss: true,
								draggable: true,
								pauseOnHover: true,
								closeOnClick: true,
							});
							toast.error(error.message);
							break;
					}
				}
			}
		};

		return (
			<Box component="form" onSubmit={handleSubmit}>
				<Typography
					component="h1"
					variant="h4"
					align="center"
					gutterBottom
				>
					Editando [{myArticle.title}]
				</Typography>
				<Accordion sx={{}} variant="outlined">
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Editar metadados</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<EditMetadataContent
							defaultValues={{
								title: myArticle.title,
								description: myArticle.description,
								tags: myArticle.tags,
								visibility: myArticle.visibility,
							}}
						/>
					</AccordionDetails>
				</Accordion>
				<Accordion variant="outlined" defaultExpanded sx={{}}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Editar Artigo</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box
							sx={{
								mx: { xs: -2, sm: -2, md: 0 },
							}}
						>
							<MdEditor
								myArticle={myArticle}
								myArticleDocument={myArticleDocument}
								setMyArticleDocument={setMyArticleDocument}
								saveButtonRef={saveButtonRef}
							/>
						</Box>
					</AccordionDetails>
				</Accordion>
				<Accordion variant="outlined" defaultExpanded sx={{}}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography>Editar Anexos</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Box
							sx={{
								mx: { xs: -2, sm: -2, md: 0 },
							}}
						>
							<AttachmentsComponent
								myArticle={myArticle}
								myArticleDocument={myArticleDocument}
							/>
						</Box>
					</AccordionDetails>
				</Accordion>
				<Grid container spacing={2} p={2}>
					<Grid xs="auto">
						<Stack
							direction="row"
							justifyContent="center"
							alignItems="center"
							spacing={2}
						>
							<Button
								type="submit"
								name="save"
								variant="outlined"
								sx={{
									p: 1.5,
								}}
								disabled={!accept}
								ref={saveButtonRef}
							>
								Salvar
							</Button>
							<Button
								type="submit"
								name="saveAndFinish"
								variant="contained"
								sx={{
									p: 1.5,
								}}
								disabled={!accept}
							>
								Salvar e finalizar
							</Button>
						</Stack>
					</Grid>
					<Grid>
						<FormControlLabel
							control={
								<Checkbox
									required
									value="accept-terms"
									name="accept-terms"
									id="accept-terms"
									checked={accept}
									onChange={(e) => {
										setAccept(e.target.checked);
									}}
								/>
							}
							label={
								<>
									<Typography variant="body2" fontSize={13}>
										Declaro que li e concordo com os{' '}
										<Link
											href="/terms"
											component={NextLink}
											underline="hover"
											alignItems="center"
											target="_blank"
										>
											Termos de Serviço
										</Link>
										{' e '}
										<Link
											href="/privacy"
											component={NextLink}
											underline="hover"
											alignItems="center"
											target="_blank"
										>
											Política de Privacidade
										</Link>
									</Typography>
								</>
							}
						/>
					</Grid>
				</Grid>
			</Box>
		);
	}
	return (
		<PageMessage message="Artigo não encontrado, ou você não possui permissão para editar" />
	);
};

export default EditArticle;
