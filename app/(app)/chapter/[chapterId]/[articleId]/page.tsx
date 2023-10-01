// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import { default as ArticlePage } from '../../../article/[...slug]/page';

interface PageProps {
	params: { articleId: string };
}

const Page: FunctionComponent<PageProps> = ({ params }) => {
	return <ArticlePage params={{ slug: [params.articleId, 'f'] }} />;
};

export default Page;
