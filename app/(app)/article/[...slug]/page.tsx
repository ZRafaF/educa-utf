// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ArticleComponent from '@/components/ArticleComponent/ArticleComponent';
import {
	getListOfArticles,
	getArticleById,
	getArticleStatsById,
	getArticleDocumentUrl,
} from '@/lib/apiHelpers/articlesAPI';
import { FunctionComponent } from 'react';
import { getUserAvatarUrlByUserId } from '@/lib/apiHelpers/usersAPI';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
const NoSSRClientSideArticle = dynamic(() => import('./ClientSideArticle'), {
	ssr: false,
});

interface PageProps {
	params: { slug: string[] };
}

export const revalidate = 30;

export async function generateStaticParams() {
	const articles = await getListOfArticles();

	return articles.map((article) => ({
		slug: [article.id, 'f'],
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	// read route params
	const articleId = params.slug[0];

	try {
		const article = await getArticleById(articleId);
		const articleStats = await getArticleStatsById(articleId);

		return {
			title: article.title,
			description: article.description,
			applicationName: 'EducaUTF',
			authors: [{ name: articleStats.author_name }],
		};
	} catch (error) {
		return {
			title: 'Artigo privado',
			description: 'Artigo privado',
		};
	}
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const articleId = params.slug[0];
	const fullWidth = params.slug[1] ? false : true;

	try {
		const article = await getArticleById(articleId);
		const articleStats = await getArticleStatsById(article.id);
		const articleDocument = await getArticleDocumentUrl(article);
		const authorAvatarUrl = await getUserAvatarUrlByUserId(article.user);

		return (
			<ArticleComponent
				myArticle={article}
				articleStats={articleStats}
				fullWidth={fullWidth}
				articleDocument={articleDocument}
				authorAvatarUrl={authorAvatarUrl}
			/>
		);
	} catch (error) {
		return (
			<NoSSRClientSideArticle
				articleId={articleId}
				fullWidth={fullWidth}
			/>
		);
	}
};

export default Page;
