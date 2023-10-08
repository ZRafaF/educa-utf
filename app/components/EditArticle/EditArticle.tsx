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

interface EditArticleProps {
	articleId: string;
}

const EditArticle: FunctionComponent<EditArticleProps> = ({ articleId }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [myArticle, setMyArticle] =
		useState<ArticlesResponse<ArticlesExpand>>();
	const [myArticleDocument, setMyArticleDocument] = useState<string>('');
	const [, user] = usePbAuth();

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
	} else if (myArticle && myArticleDocument) {
		return (
			<Container>
				<MarkdownEditorComponent
					myArticleDocument={myArticleDocument}
					setMyArticleDocument={setMyArticleDocument}
				/>
			</Container>
		);
	}
	return (
		<PageMessage message="Artigo não encontrado, ou você não possui permissão para editar" />
	);
};

export default EditArticle;
