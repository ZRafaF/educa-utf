// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostsStatsResponse, PostsResponse } from '@/types/pocketbase-types';
import PostContent from './PostContent/PostContent';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO } from 'date-fns';
import PostInfo from './PostInfo/PostInfo';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import { getPostDocumentUrl } from '@/lib/apiHelpers/postsAPI';
import { PostsExpand } from '@/types/expanded-types';

export const revalidate = 30;

async function getArticle(post: PostsResponse) {
	const markDownContent = await getPostDocumentUrl(
		post.id,
		post.collectionId,
		post.collectionName,
		post.document
	);
	try {
		return await fetch(markDownContent).then((response) => response.text());
	} catch (error) {
		return 'Não foi possível encontrar esse post :(';
	}
}

async function PostComponent({
	myPost,
	postStats,
}: {
	myPost: PostsResponse<PostsExpand>;
	postStats: PostsStatsResponse;
}) {
	const article = await getArticle(myPost);

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
				pl={{ xs: 2, sm: 2, md: 3, lg: 10, xl: 25 }}
				pt={{ xs: 3, sm: 4, md: 8 }}
				pb={2}
			>
				<Grid xs={20} sm={20} md={20} lg mb={3} pr={2}>
					<Typography variant="h3" color="primary" fontWeight={700}>
						{myPost.title}
					</Typography>
					<Typography
						color="text.secondary"
						variant="subtitle2"
						gutterBottom
					>
						{getFormattedDate(myPost.created)}
					</Typography>
				</Grid>
				<Grid xs={20} sm={20} md={20} lg={5} xl={5}>
					<PostInfo postStats={postStats} myPost={myPost} />
				</Grid>
			</Grid>
			<Box mx={{ xs: 2, sm: 2, md: 3, lg: 10, xl: 25 }} pb={5}>
				<PostContent article={article} />
			</Box>
		</Box>
	);
}

export default PostComponent;
