// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getListOfPosts } from "@/lib/dbApi";
import { PostsResponse } from "@/types/pocketbase-types";
import PostCard from "@/components/PostCard/PostCard";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2
import { waitMillisecond } from "@/lib/helper";
import React from "react";
import Box from "@mui/material/Box/Box";

async function BestPosts() {
	console.log(await waitMillisecond(1000));
	const posts = await getListOfPosts().catch((error) => {
		return [] as PostsResponse[];
	});
	return (
		<Box>
			<Grid container spacing={2} sx={{ mt: 1 }} justifyContent="center">
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
