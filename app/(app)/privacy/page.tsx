// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container/Container';
import { FunctionComponent } from 'react';
import privacy from './privacy.md';
import type { Metadata } from 'next/types';
import ArticleContent from '@/components/ArticleComponent/ArticleContent/ArticleContent';

export const metadata: Metadata = {
	title: 'Política de Privacidade - EducaUTF',
	description: 'Política de Privacidade do EducaUTF',
	keywords: [
		'EducaUTF',
		'Educa UTF',
		'privacy policy',
		'política de privacidade',
	],
};

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return (
		<Container sx={{ pb: 2 }}>
			<ArticleContent articleDocument={privacy} article={undefined} />
		</Container>
	);
};

export default Page;
