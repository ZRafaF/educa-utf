// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	AuthorsResponse,
	PostsResponse,
	UsersResponse,
} from '@/types/pocketbase-types';
import PostContent from './PostContent/PostContent';
import { getPostDocumentUrl } from '@/lib/dbApi';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO, getDay, getMonth, getYear } from 'date-fns';
import PostInfo from './PostInfo/PostInfo';
import Grid from '@mui/material/Grid/Grid';

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
	author,
}: {
	myPost: PostsResponse;
	author: AuthorsResponse;
}) {
	const article = await getArticle(myPost);

	const getFormattedDate = (date: string) => {
		const parsedDate = parseISO(date);

		const formatted = format(parsedDate, 'PPP', {
			locale: ptBR,
		});
		console.log(formatted);
		return formatted;
	};

	return (
		<Box
			sx={{
				minHeight: '90vh',
				py: 8,
			}}
		>
			<Grid
				container
				direction="row"
				alignItems={'center'}
				justifyContent="space-between"
				pl={{ xs: 2, sm: 2, md: 3, lg: 10, xl: 25 }}
			>
				<Grid xs>
					<Typography
						variant="h2"
						color="text.primary"
						fontWeight={700}
					>
						{myPost.title}
					</Typography>
					<Typography color="text.secondary" variant="subtitle2">
						{getFormattedDate(myPost.created)}
					</Typography>
				</Grid>
				<Grid xs={4}>
					<PostInfo author={author} myPost={myPost} />
				</Grid>
			</Grid>
			<Box mx={{ xs: 2, sm: 2, md: 3, lg: 10, xl: 25 }}>
				<PostContent article={article} />
			</Box>
		</Box>
	);
}

export default PostComponent;
