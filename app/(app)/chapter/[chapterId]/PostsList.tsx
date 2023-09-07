// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import List from "@mui/material/List/List";
import Divider from "@mui/material/Divider/Divider";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import Avatar from "@mui/material/Avatar/Avatar";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import Link from "next/link";
import { ChaptersResponse, PostsResponse } from "@/types/pocketbase-types";
import Box from "@mui/material/Box/Box";

interface PostsListProps {
	posts: PostsResponse[] | undefined;
	chapter: ChaptersResponse;
}

const PostsList: FunctionComponent<PostsListProps> = ({ posts, chapter }) => {
	return (
		<List sx={{ width: "100%" }}>
			<Divider component="li" />

			{posts?.map((post: PostsResponse) => (
				<Box key={"link_to_post" + post.id}>
					<ListItemButton
						alignItems="flex-start"
						LinkComponent={Link}
						href={`/chapter/${chapter.id}/post/${post.id}`}
					>
						<ListItemAvatar>
							<Avatar variant="square">N</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={post.title}
							secondary={post.description}
						/>
					</ListItemButton>

					<Divider component="li" />
				</Box>
			))}
		</List>
	);
};

export default PostsList;
