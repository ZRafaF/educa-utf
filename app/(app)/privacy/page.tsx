// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container/Container';
import { FunctionComponent } from 'react';
import privacy from './privacy.md';
import ArticleContent from '@/components/ArticleComponent/ArticleContent/ArticleContent';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
	title: 'Política de Privacidade',
	description: 'Política de Privacidade do EducaUTF',
};

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return (
		<Container sx={{ pb: 2 }}>
			<ArticleContent article={privacy} />
		</Container>
	);
};

export default Page;
