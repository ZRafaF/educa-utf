// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ArticleComponent from '@/components/ArticleComponent/ArticleComponent';
import {
	getFullListOfArticles,
	getArticleById,
	getArticleStatsById,
	getArticleDocument,
} from '@/lib/apiHelpers/articlesAPI';
import { FunctionComponent, Suspense } from 'react';
import { getUserAvatarUrlByUserId } from '@/lib/apiHelpers/usersAPI';
import type { Metadata } from 'next';
import PageMessage from '@/components/PageMessage/PageMessage';
import dynamic from 'next/dynamic';

const ViewsBumper = dynamic(
	() => import('@/components/ViewsBumper/ViewsBumper'),
	{
		ssr: false,
	}
);

const NoSSRClientSideArticle = dynamic(() => import('./ClientSideArticle'), {
	ssr: false,
});

interface PageProps {
	params: { slug: string[] };
}

export const revalidate = 0;

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
		let tag = article.expand?.tag?.name ?? '';

		const keywords = article.expand?.key_words ?? [];
		const keywodsString = keywords.map((kw) => kw.word);

		return {
			title: `${article.title} - EducaUTF`,
			description: article.description,
			applicationName: 'EducaUTF',
			authors: [{ name: articleStats.author_name }],
			openGraph: {
				title: article.title,
				description: article.description,
				siteName: 'EducaUTF',
				locale: 'pt_BR',
				type: 'website',
			},
			keywords: [
				'EducaUTF',
				'Educa UTF',
				'artigo',
				article.title,
				tag,
				...keywodsString,
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
		const articleDocument = await getArticleDocument(article);
		const authorAvatarUrl = await getUserAvatarUrlByUserId(article.user);

		if (articleDocument)
			return (
				<Suspense
					fallback={<PageMessage message="Carregando..." loading />}
				>
					<ArticleComponent
						myArticle={article}
						articleStats={articleStats}
						fullWidth={fullWidth}
						articleDocument={articleDocument}
						authorAvatarUrl={authorAvatarUrl}
					/>
					<ViewsBumper
						collectionName="articles"
						recordId={articleId}
					/>
				</Suspense>
			);
		else {
			return <PageMessage message="Artigo não encontrado" />;
		}
	} catch (error) {
		return (
			<>
				<NoSSRClientSideArticle
					articleId={articleId}
					fullWidth={fullWidth}
				/>
				<ViewsBumper collectionName="articles" recordId={articleId} />
			</>
		);
	}
};

export default Page;
