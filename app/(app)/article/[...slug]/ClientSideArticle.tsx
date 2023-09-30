// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import ArticleComponent from '@/components/ArticleComponent/ArticleComponent';
import ArticleComponentLoading from '@/components/ArticleComponent/ArticleComponentLoading';
import {
	getArticleById,
	getArticleDocumentUrl,
	getArticleStatsById,
} from '@/lib/apiHelpers/articlesAPI';
import { getUserAvatarUrlByUserId } from '@/lib/apiHelpers/usersAPI';
import { ArticlesExpand } from '@/types/expanded-types';
import {
	ArticlesResponse,
	ArticlesStatsResponse,
} from '@/types/pocketbase-types';
import { FunctionComponent, Suspense, useEffect, useState } from 'react';

interface ClientSideArticleProps {
	fullWidth?: boolean;
	articleId: string;
}

const ClientSideArticle: FunctionComponent<ClientSideArticleProps> = ({
	fullWidth,
	articleId,
}) => {
	const [loading, setLoading] = useState<boolean>(true);

	const [article, setArticle] = useState<ArticlesResponse<ArticlesExpand>>();
	const [articleStats, setArticleStats] = useState<ArticlesStatsResponse>();
	const [articleDocument, setArticleDocument] = useState<string>();
	const [authorAvatarUrl, setAuthorAvatarUrl] = useState<string>();

	useEffect(() => {
		async function fetchData() {
			try {
				const fetchedArticle = await getArticleById(articleId);
				const fetchedArticleStats = await getArticleStatsById(
					articleId
				);
				const fetchedArticleDocument = await getArticleDocumentUrl(
					fetchedArticle
				);
				const fetchedAuthorAvatarUrl = await getUserAvatarUrlByUserId(
					fetchedArticle.user
				);

				setArticle(fetchedArticle);
				setArticleStats(fetchedArticleStats);
				setArticleDocument(fetchedArticleDocument);
				setAuthorAvatarUrl(fetchedAuthorAvatarUrl);
			} catch (error) {}
			setLoading(false);
		}
		fetchData();
	}, [articleId]);

	if (loading) return <ArticleComponentLoading />;

	if (article && articleStats && articleDocument && authorAvatarUrl) {
		return (
			<Suspense fallback={<>Carregando artigo...</>}>
				<ArticleComponent
					myArticle={article}
					articleStats={articleStats}
					fullWidth={fullWidth}
					articleDocument={articleDocument}
					authorAvatarUrl={authorAvatarUrl}
				/>
			</Suspense>
		);
	}
	return <div suppressHydrationWarning>Nada aqui</div>;
};

export default ClientSideArticle;
