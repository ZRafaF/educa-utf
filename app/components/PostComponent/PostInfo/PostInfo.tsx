// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PostTags from '@/components/PostTags/PostTags';
import { AuthorsResponse, PostsResponse } from '@/types/pocketbase-types';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { FunctionComponent } from 'react';

interface PostInfoProps {
	myPost: PostsResponse;
	author: AuthorsResponse;
}

const PostInfo: FunctionComponent<PostInfoProps> = ({ myPost, author }) => {
	return (
		<Box
			sx={{
				p: 2,
				backgroundColor: '#F2F2F2',
				borderRadius: '20px 0px 0px 20px',
				boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)',
			}}
		>
			<Typography color="text.secondary">
				{author ? author.name : 'desconhecido'}
			</Typography>
			<PostTags tags={myPost.tags} />
		</Box>
	);
};

export default PostInfo;
