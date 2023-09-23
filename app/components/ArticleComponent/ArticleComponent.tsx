// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	ArticlesResponse,
	ArticlesStatsResponse,
} from '@/types/pocketbase-types';
import ArticleContentSSR from './ArticleContent/ArticleContent';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO } from 'date-fns';
import PostInfo from './PostInfo/PostInfo';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import { getArticleDocumentUrl } from '@/lib/apiHelpers/articlesAPI';
import { ArticlesExpand } from '@/types/expanded-types';
import { getUserAvatarUrlByUserId } from '@/lib/apiHelpers/usersAPI';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';

export const revalidate = 30;

async function getArticle(article: ArticlesResponse) {
	const markDownContent = await getArticleDocumentUrl(
		article.id,
		article.collectionId,
		article.collectionName,
		article.document
	);
	try {
		return await fetch(markDownContent).then((response) => response.text());
	} catch (error) {
		return 'Não foi possível encontrar esse post :(';
	}
}

async function ArticleComponent({
	myArticle,
	articleStats,
	fullWidth,
}: {
	myArticle: ArticlesResponse<ArticlesExpand>;
	articleStats: ArticlesStatsResponse;
	fullWidth?: boolean;
}) {
	const article = await getArticle(myArticle);
	const authorAvatarUrl = await getUserAvatarUrlByUserId(myArticle.user);

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
					<Typography variant="h3" color="primary" fontWeight={700}>
						{myArticle.title}
					</Typography>
					<Typography
						color="text.secondary"
						variant="subtitle2"
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
				<ArticleContentSSR article={article} />
			</Box>
		</Box>
	);
}

export default ArticleComponent;
