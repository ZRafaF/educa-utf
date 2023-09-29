// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container/Container';
import { FunctionComponent } from 'react';
import terms from './terms.md';
import ArticleContent from '@/components/ArticleComponent/ArticleContent/ArticleContent';

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return (
		<Container sx={{ pb: 2 }}>
			<ArticleContent article={terms} />
		</Container>
	);
};

export default Page;
