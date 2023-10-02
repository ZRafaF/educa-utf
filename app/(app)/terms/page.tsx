// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container/Container';
import { FunctionComponent } from 'react';
import terms from './terms.md';
import ArticleContent from '@/components/ArticleComponent/ArticleContent/ArticleContent';
import type { Metadata } from 'next/types';

export const metadata: Metadata = {
	title: 'Termos de Serviço',
	description: 'Termos de Serviço do EducaUTF',
};
interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return (
		<Container sx={{ pb: 2 }}>
			<ArticleContent article={terms} />
		</Container>
	);
};

export default Page;
