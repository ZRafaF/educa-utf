// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getListOfArticlesStats } from '@/lib/apiHelpers/articlesAPI';
import { FunctionComponent } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import PaginationComponent from './PaginationComponent';
import Box from '@mui/material/Box';
import {
	MIN_FOOTER_HEIGHT,
	MIN_PAGINATION_HEIGHT,
	MIN_TOOLBAR_HEIGHT,
} from '@/lib/helper';
import PageMessage from '../PageMessage/PageMessage';
import SearchResultHeader from './SearchResultHeader/SearchResultHeader';
import { constructFilterString } from '@/lib/apiHelpers/miscAPI';

interface ArticlesTableProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const ArticlesTable: FunctionComponent<ArticlesTableProps> = async ({
	searchParams,
}) => {
	const sort = searchParams?.sort ?? '-created';
	const page = Number(searchParams?.page ?? 1);
	const items = Number(searchParams?.items ?? 50);
	const filter = constructFilterString(searchParams);

	const search = searchParams?.search ?? '';

	const articleList = await getListOfArticlesStats(page, items, {
		sort: sort,
		filter: filter,
	});

	return (
		<>
			<Box
				minHeight={`calc(100vh - ${MIN_FOOTER_HEIGHT} - ${MIN_TOOLBAR_HEIGHT} - ${MIN_PAGINATION_HEIGHT})`}
			>
				<SearchResultHeader searchRecords={articleList} />
				{articleList.totalItems === 0 ? (
					<PageMessage message="Ops. Parece que não ha correspondências a sua pesquisa. Tente alterar seus filtros!" />
				) : (
					<Grid
						container
						spacing={1}
						sx={{
							justifyContent: {
								xs: 'start',
								sm: 'start',
								lg: 'start',
							},
						}}
					>
						{articleList.items.map((article, idx) => (
							<Grid
								key={`article_${article.id}`}
								xs={15}
								sm={6}
								md={6}
								lg={4}
								xl={3}
							>
								<ArticleCard
									myArticle={article}
									// idx={(page - 1) * items + idx}
									highlightedWords={
										search instanceof Array
											? search
											: [search]
									}
								/>
							</Grid>
						))}
					</Grid>
				)}
			</Box>

			<PaginationComponent totalPages={articleList.totalPages} />
		</>
	);
};

export default ArticlesTable;
