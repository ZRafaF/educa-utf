// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getListOfPosts } from '@/lib/dbApi';
import { PostsResponse } from '@/types/pocketbase-types';
import PostCard from '@/components/PostCard/PostCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import React from 'react';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { getRandomImageUrl } from '@/lib/helper';

export const revalidate = 10;

async function getBestPosts() {
	const posts = await getListOfPosts().catch((error) => {
		return [] as PostsResponse[];
	});
	return posts;
}

async function BestPosts() {
	const posts = await getBestPosts();
	return (
		<Box>
			<Typography variant="h5" fontWeight={700} pb={3}>
				Os melhores posts do mês
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
				{posts.map((post, idx) => (
					<Grid
						key={`post_${idx}`}
						xs={6}
						sm={4}
						md={3.5}
						lg={3}
						xl={3}
					>
						<PostCard
							myPost={post}
							href={`/post/${post.id}`}
							imgSrc={getRandomImageUrl()}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default BestPosts;
