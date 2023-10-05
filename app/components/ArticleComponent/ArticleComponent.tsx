// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	ArticlesResponse,
	ArticlesStatsResponse,
} from '@/types/pocketbase-types';
import ArticleContent from './ArticleContent/ArticleContent';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO } from 'date-fns';
import PostInfo from './PostInfo/PostInfo';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import { ArticlesExpand } from '@/types/expanded-types';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

function ArticleComponent({
	myArticle,
	articleStats,
	fullWidth,
	articleDocument,
	authorAvatarUrl,
}: {
	myArticle: ArticlesResponse<ArticlesExpand>;
	articleStats: ArticlesStatsResponse;
	fullWidth?: boolean;
	articleDocument: string;
	authorAvatarUrl: string;
}) {
	const getFormattedDate = (date: string) => {
		const parsedDate = parseISO(date);

		return format(parsedDate, 'PPP', {
			locale: ptBR,
		});
	};

	return (
		<Box
			sx={{
				minHeight: '90vh',
			}}
		>
			<Grid
				container
				direction="row"
				alignItems={'center'}
				justifyContent="space-between"
				pl={{
					xs: 2,
					sm: 3,
					md: 4,
					lg: fullWidth ? 20 : 5,
					xl: fullWidth ? 30 : 5,
				}}
				pt={{ xs: 3, sm: 4, md: 8 }}
				pb={2}
			>
				<Grid xs={20} sm={20} md={20} lg mb={3} pr={2}>
					<Typography
						variant="h3"
						component="h1"
						color="primary"
						fontWeight={700}
					>
						{myArticle.title}
					</Typography>
					<Typography
						color="text.secondary"
						variant="subtitle2"
						component="p"
						gutterBottom
					>
						{getFormattedDate(myArticle.created)}
					</Typography>
				</Grid>
				<Grid xs={20} sm={20} md={20} lg={5} xl={5}>
					<Suspense
						fallback={
							<Skeleton
								variant="circular"
								width={40}
								height={40}
							/>
						}
					>
						<PostInfo
							articleStats={articleStats}
							myArticle={myArticle}
							authorAvatarUrl={authorAvatarUrl}
						/>
					</Suspense>
				</Grid>
			</Grid>
			<Box
				mx={{
					xs: 2,
					sm: 3,
					md: 4,
					lg: fullWidth ? 20 : 5,
					xl: fullWidth ? 30 : 5,
				}}
				pb={5}
			>
				<ArticleContent article={articleDocument} />
			</Box>
		</Box>
	);
}

export default ArticleComponent;
