// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ArticlesExpand, ChaptersExpandTags } from '@/types/expanded-types';
import {
	ArticlesStatsResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import Typography from '@mui/material/Typography';
import { ListResult } from 'pocketbase';
import { FunctionComponent } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import ChapterCard from '@/components/ChapterCard/ChapterCard';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import CircularProgress from '@mui/material/CircularProgress';

interface InnerContentExplorerProps {
	listResult:
		| ListResult<
				| ChaptersStatsResponse<ChaptersExpandTags>
				| ArticlesStatsResponse<ArticlesExpand>
		  >
		| undefined;
	loading: boolean;
	type: 'articles' | 'chapters';
}

const InnerContentExplorer: FunctionComponent<InnerContentExplorerProps> = ({
	listResult,
	loading,
	type,
}) => {
	if (loading) {
		return (
			<>
				<Typography
					variant="body2"
					color="text.secondary"
					textAlign={'center'}
					p={1}
				>
					Carregando... <CircularProgress color="inherit" size={16} />
				</Typography>
			</>
		);
	}

	if (listResult === undefined || listResult.totalPages === 0)
		return (
			<Typography
				variant="body2"
				color="text.secondary"
				textAlign={'center'}
				p={1}
			>
				Nenhum Item encontrado...
			</Typography>
		);

	return (
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
			{listResult?.items.map((item) => (
				<>
					{type === 'articles' ? (
						<Grid
							key={`article_${item.id}`}
							xs={12}
							sm={6}
							md={6}
							lg={4}
							xl={4}
						>
							<ArticleCard
								key={item.id}
								myArticle={
									item as ArticlesStatsResponse<ArticlesExpand>
								}
							/>
						</Grid>
					) : (
						<Grid
							key={`chapter_${item.id}`}
							xs={6}
							sm={4}
							md={4}
							lg={3}
							xl={3}
						>
							<ChapterCard
								key={item.id}
								myChapter={
									item as ChaptersStatsResponse<ChaptersExpandTags>
								}
								isExpanded={false}
							/>
						</Grid>
					)}
				</>
			))}
		</Grid>
	);
};

export default InnerContentExplorer;
