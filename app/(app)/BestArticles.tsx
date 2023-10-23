// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import React from 'react';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { getBestArticlesOf } from '@/lib/apiHelpers/articlesAPI';
import ArticleCard from '@/components/ArticleCard/ArticleCard';

export const revalidate = 30;

async function BestArticles() {
	const articles = await getBestArticlesOf('month');

	return (
		<Box>
			<Typography variant="h5" fontWeight={700} pb={3}>
				Os melhores artigos do mês
			</Typography>
			<Grid
				container
				spacing={2}
				sx={{
					justifyContent: {
						xs: 'center',
						sm: 'center',
						lg: 'left',
					},
				}}
			>
				{articles.map((article, idx) => (
					<Grid
						key={`article_${idx}`}
						xs={15}
						sm={6}
						md={6}
						lg={6}
						xl={4}
					>
						<ArticleCard myArticle={article} idx={idx} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default BestArticles;
