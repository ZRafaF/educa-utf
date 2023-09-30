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
import { FunctionComponent } from 'react';

interface PageProps {
	params: { slug: string[] };
}

export const revalidate = 30;

export async function generateStaticParams() {
	const articles = await getListOfArticles();

	return articles.map((article) => ({
		slug: [article.id, 'full'],
	}));
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const articleId = params.slug[0];
	const article = await getArticleById(articleId);
	const articleStats = await getArticleStatsById(article.id);
	return (
		<ArticleComponent
			myArticle={article}
			articleStats={articleStats}
			fullWidth={params.slug[1] ? false : true}
		/>
	);
};

export default Page;
