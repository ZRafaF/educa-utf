// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import React from 'react';
import { getBestArticlesOf } from '@/lib/apiHelpers/articlesAPI';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import FadeInAnimation from '@/components/FadeInAnimation/FadeInAnimation';

export const revalidate = 0;

async function BestArticles() {
	const articles = await getBestArticlesOf('month');

	return (
		<>
			{articles.map((article, idx) => (
				<Grid
					key={`article_${idx}`}
					xs={15}
					sm={6}
					md={6}
					lg={4}
					xl={4}
				>
					<FadeInAnimation
						// Random number between 300 - 600
						durationMs={Math.floor(Math.random() * 300) + 300}
					>
						<ArticleCard myArticle={article} idx={idx} />
					</FadeInAnimation>
				</Grid>
			))}
		</>
	);
}

export default BestArticles;
