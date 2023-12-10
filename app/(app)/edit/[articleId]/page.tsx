// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import { Metadata } from 'next/types';
import { getArticleById } from '@/lib/apiHelpers/articlesAPI';
import EditArticle from '@/components/EditArticle/EditArticle';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';

// const EditArticle = dynamic(() => import('@/components/EditArticle/EditArticle'), {
// 	ssr: false,
// });

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
	return (
		<Box
			sx={{
				py: 4,
				flexGrow: 1,
				px: { sm: 0, md: 2, lg: 3 },
				paddingRight: 1,
			}}
		>
			<EditArticle articleId={articleId} />
		</Box>
	);
};

export default Page;
