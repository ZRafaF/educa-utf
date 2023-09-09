// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PostCard from '@/components/PostCard/PostCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import React from 'react';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { getRandomImageUrl } from '@/lib/helper';
import { getBestPostsOf } from '@/lib/apiHelpers/postsAPI';

export const dynamic = 'force-dynamic';

async function BestPosts() {
	const posts = await getBestPostsOf('month');

	return (
		<Box>
			<Typography variant="h5" fontWeight={700} pb={3}>
				Os melhores posts do mês
			</Typography>
			<Grid
				container
				spacing={1}
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
						md={3.3}
						lg={2.5}
						xl={2.5}
					>
						<PostCard
							myPost={post}
							href={`/post/${post.id}`}
							isExpanded={false}
							imgSrc={getRandomImageUrl()}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default BestPosts;
