// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ArticleComponent from '@/components/ArticleComponent/ArticleComponent';
import {
	getListOfArticles,
	getArticleById,
	getArticleStatsById,
} from '@/lib/apiHelpers/articlesAPI';
import { FunctionComponent, Suspense } from 'react';

interface PageProps {
	params: {
		articleId: string;
	};
}

export const revalidate = 30;

export async function generateStaticParams() {
	const articles = await getListOfArticles();

	return articles.map((article) => ({
		articleId: article.id,
	}));
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const articleId = params.articleId;
	const article = await getArticleById(articleId);
	const articleStats = await getArticleStatsById(article.id);
	return (
		<Suspense fallback={<div>Carregando artigo...</div>}>
			<ArticleComponent
				myArticle={article}
				articleStats={articleStats}
				fullWidth
			/>
		</Suspense>
	);
};

export default Page;
