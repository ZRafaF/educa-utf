// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { ArticlesResponse } from '@/types/pocketbase-types';
import { ArticlesExpand } from '@/types/expanded-types';
import PageMessage from '../PageMessage/PageMessage';
import usePbAuth from '@/hooks/usePbAuth';
import {
	getArticleById,
	getArticleDocumentUrl,
} from '@/lib/apiHelpers/articlesAPI';
import MarkdownEditorComponent from './MarkdownEditorComponent/MarkdownEditorComponent';
import Typography from '@mui/material/Typography/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditMetadata from '../EditMetadata/EditMetadata';
import Grid from '@mui/material/Unstable_Grid2';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import Link from '@mui/material/Link/Link';

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
	const [accept, setAccept] = useState<boolean>(false);

	useEffect(() => {
		const fetchArticleInfo = async () => {
			console.log(articleId);
			const article = await getArticleById(articleId);
			console.log(article);

			if (article.user === user?.id) {
				const articleDocument = await getArticleDocumentUrl(article);
				console.log(articleDocument);
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
		return (
			<Container
				maxWidth={'lg'}
				sx={{ py: 4, flexGrow: 1, px: { sm: 0, md: 2, lg: 3 } }}
				disableGutters
			>
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
						<EditMetadata />
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
						<MarkdownEditorComponent
							myArticleDocument={myArticleDocument}
							setMyArticleDocument={setMyArticleDocument}
						/>
					</AccordionDetails>
				</Accordion>
				<Grid container spacing={2} p={2}>
					<Grid xs="auto">
						<Button
							type="submit"
							variant="contained"
							sx={{
								p: 1.5,
							}}
							disabled={!accept}
						>
							Salvar modificações
						</Button>
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
			</Container>
		);
	}
	return (
		<PageMessage message="Artigo não encontrado, ou você não possui permissão para editar" />
	);
};

export default EditArticle;
