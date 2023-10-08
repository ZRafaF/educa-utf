// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import { Metadata } from 'next/types';
import { getArticleById } from '@/lib/apiHelpers/articlesAPI';
import EditArticle from '@/components/EditArticle/EditArticle';

interface PageProps {
	params: { articleId: string };
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const articleId = params.articleId;

	try {
		const article = await getArticleById(articleId);
		let tags = article.expand?.tags.map((tag) => tag.name);
		if (tags === undefined) tags = [''];
		return {
			title: `Editar artigo (${article.title}) - EducaUTF`,
			description: 'Edite seu artigo do EducaUTF',
			applicationName: 'EducaUTF',

			robots: 'noindex,nofollow',
			keywords: ['EducaUTF', 'Educa UTF', 'edit', article.title, ...tags],
		};
	} catch (error) {
		return {
			title: 'Editar artigo - EducaUTF',
			description: 'Editar artigo - EducaUTF',
		};
	}
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const articleId = params.articleId;
	return <EditArticle articleId={articleId} />;
};

export default Page;
