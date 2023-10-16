// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ArticleComponent from '@/components/ArticleComponent/ArticleComponent';
import {
	getFullListOfArticles,
	getArticleById,
	getArticleStatsById,
	getArticleDocumentUrl,
	getArticleCoverURL,
} from '@/lib/apiHelpers/articlesAPI';
import { FunctionComponent } from 'react';
import { getUserAvatarUrlByUserId } from '@/lib/apiHelpers/usersAPI';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import PageMessage from '@/components/PageMessage/PageMessage';
const NoSSRClientSideArticle = dynamic(() => import('./ClientSideArticle'), {
	ssr: false,
});

interface PageProps {
	params: { slug: string[] };
}

export const revalidate = 30;

export async function generateStaticParams() {
	const articles = await getFullListOfArticles();

	return articles.map((article) => ({
		slug: [article.id, 'f'],
	}));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const articleId = params.slug[0];

	try {
		const article = await getArticleById(articleId);
		const articleStats = await getArticleStatsById(articleId);
		const ArticleCoverUrl = getArticleCoverURL(article);
		let tags = article.expand?.tags.map((tag) => tag.name);
		if (tags === undefined) tags = [''];
		return {
			title: `${article.title} - EducaUTF`,
			description: article.description,
			applicationName: 'EducaUTF',
			authors: [{ name: articleStats.author_name }],
			openGraph: {
				title: article.title,
				description: article.description,
				siteName: 'EducaUTF',
				images: [{ url: ArticleCoverUrl }],
				locale: 'pt_BR',
				type: 'website',
			},
			keywords: [
				'EducaUTF',
				'Educa UTF',
				'artigo',
				article.title,
				...tags,
			],
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

		if (articleDocument)
			return (
				<ArticleComponent
					myArticle={article}
					articleStats={articleStats}
					fullWidth={fullWidth}
					articleDocument={articleDocument}
					authorAvatarUrl={authorAvatarUrl}
				/>
			);
		else {
			return <PageMessage message="Artigo não encontrado" />;
		}
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
