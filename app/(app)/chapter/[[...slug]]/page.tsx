// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent, Suspense } from 'react';
import { default as ArticlePage } from '../../article/[...slug]/page';

interface PageProps {
	params: { slug: string[] };
}

const Page: FunctionComponent<PageProps> = ({ params }) => {
	const chapterId = params.slug[0];
	const articleId = params.slug[1];

	console.log(chapterId);
	console.log(articleId);

	return (
		<Suspense fallback={'carregando'}>
			<ArticlePage params={{ slug: [articleId] }} />
		</Suspense>
	);
};

export default Page;
