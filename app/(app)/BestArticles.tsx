// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ArticleCard from '@/components/ArticleCard/ArticleCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import React from 'react';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { getRandomImageUrl } from '@/lib/helper';
import { getBestArticlesOf } from '@/lib/apiHelpers/articlesAPI';

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
				spacing={1}
				sx={{
					justifyContent: {
						xs: 'center',
						sm: 'left',
						md: 'space-between',
						lg: 'space-between',
					},
				}}
			>
				{articles.map((article, idx) => (
					<Grid
						key={`article_${idx}`}
						xs={6}
						sm={4}
						md={3}
						lg={2.4}
						xl={2.4}
					>
						<ArticleCard
							myArticle={article}
							href={`/article/${article.id}`}
							isExpanded={false}
							imgSrc={getRandomImageUrl()}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default BestArticles;
