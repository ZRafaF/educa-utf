// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	ArticlesResponse,
	ArticlesStatsResponse,
} from '@/types/pocketbase-types';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import PostInfo from './PostInfo/PostInfo';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import { ArticlesExpand } from '@/types/expanded-types';
import { Suspense } from 'react';
import Skeleton from '@mui/material/Skeleton';
import ArticleContent from './ArticleContent/ArticleContent';
import { getFormattedDate, getFormattedVisibility } from '@/lib/helper';
import Stack from '@mui/material/Stack';
import dynamic from 'next/dynamic';
import PageMessage from '../PageMessage/PageMessage';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
const EditPostIcon = dynamic(() => import('./PostInfo/EditPostIcon'), {
	ssr: false,
});

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
	articleDocument: string | undefined;
	authorAvatarUrl: string | undefined;
}) {
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
				pb={0}
			>
				<Grid xs={20} sm={20} md={20} lg mb={3} pr={2}>
					<Typography
						variant="h3"
						component="h1"
						color="primary"
						fontWeight={700}
					>
						{myArticle.title}

						<Box component={'span'} ml={1}>
							<EditPostIcon
								articleId={myArticle.id}
								articleAuthorId={myArticle.user}
							/>
						</Box>
					</Typography>

					<Stack
						direction="row"
						spacing={1}
						alignContent="space-around"
						mt={2}
					>
						<Typography
							width={'100%'}
							color="text.secondary"
							variant="subtitle2"
							component="p"
						>
							{myArticle.description.length !== 0
								? myArticle.description
								: 'Sem descrição.'}
						</Typography>
						<Divider orientation="vertical" flexItem />
						<Stack direction="column" px={1}>
							<Typography
								color="text.secondary"
								variant="subtitle2"
								component="p"
								gutterBottom
							>
								{getFormattedDate(
									myArticle.created,
									'dd/MM/yyyy'
								)}
							</Typography>
							<Tooltip title="Visibilidade" arrow>
								<Typography
									variant="subtitle2"
									component="p"
									fontWeight={600}
									color={
										myArticle.visibility === 'public'
											? 'success.main'
											: 'text.secondary'
									}
								>
									{getFormattedVisibility(
										myArticle.visibility
									)}
								</Typography>
							</Tooltip>
						</Stack>
					</Stack>
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
				pt={{
					xs: 1,
					sm: 1.5,
					md: 2,
					lg: 0,
				}}
				pb={5}
			>
				{articleDocument ? (
					<ArticleContent
						articleDocument={articleDocument}
						article={myArticle}
					/>
				) : (
					<PageMessage message="Artigo não encontrado" />
				)}
			</Box>
		</Box>
	);
}

export default ArticleComponent;
