// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container/Container';
import { FunctionComponent } from 'react';
import attributions from './attributions.md';
import type { Metadata } from 'next/types';
import ArticleContent from '@/components/ArticleComponent/ArticleContent/ArticleContent';

export const metadata: Metadata = {
	title: 'Atribuições - EducaUTF',
	description: 'Atribuições do EducaUTF',
	keywords: ['EducaUTF', 'Educa UTF', 'attributions', 'atribuições'],
};

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return (
		<Container sx={{ pb: 2 }}>
			<ArticleContent
				articleDocument={attributions}
				article={undefined}
			/>
		</Container>
	);
};

export default Page;
