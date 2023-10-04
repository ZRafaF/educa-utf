// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
	title: 'Editar artigo - EducaUTF',
	description: 'Edite seu artigo do EducaUTF!',
	keywords: ['EducaUTF', 'Educa UTF', 'article', 'artigo', 'edit', 'editar'],
};
interface PageProps {
	params: { articleId: string };
}

const Page: FunctionComponent<PageProps> = ({ params }) => {
	const articleId = params.articleId;

	return <div>Página de edição: {articleId}</div>;
};

export default Page;
