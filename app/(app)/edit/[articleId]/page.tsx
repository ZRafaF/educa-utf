// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';

interface PageProps {
	params: { articleId: string };
}

const Page: FunctionComponent<PageProps> = ({ params }) => {
	const articleId = params.articleId;

	return <div>Página de edição: {articleId}</div>;
};

export default Page;
