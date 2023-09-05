// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getListOfPosts } from "@/lib/dbApi";
import { PostsResponse } from "@/types/pocketbase-types";
import PostCard from "@/components/PostCard/PostCard";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2
import React from "react";
import Box from "@mui/material/Box/Box";

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
			<Grid container spacing={2} justifyContent="center">
				{posts.map((post, idx) => (
					<Grid key={`post_${idx}`}>
						<PostCard myPost={post} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default BestPosts;
