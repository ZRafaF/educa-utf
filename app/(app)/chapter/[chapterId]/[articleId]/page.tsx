// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import { default as ArticlePage } from '../../../article/[...slug]/page';
import dynamic from 'next/dynamic';

const PrevNextArticle = dynamic(
	() => import('@/components/PrevNextArticle/PrevNextArticle'),
	{
		ssr: true,
	}
);

interface PageProps {
	params: { chapterId: string; articleId: string };
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	return (
		<>
			<ArticlePage params={{ slug: [params.articleId, 'f'] }} />
			<PrevNextArticle
				chapterId={params.chapterId}
				articleId={params.articleId}
			/>
		</>
	);
};

export default Page;
