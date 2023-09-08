// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { splitStringByComma } from '@/lib/helper';
import { TagsResponse } from '@/types/pocketbase-types';
import Chip from '@mui/material/Chip/Chip';
import Stack from '@mui/material/Stack/Stack';
import { FunctionComponent } from 'react';

interface PostTagsProps {
	tags: TagsResponse[] | undefined;
}

const PostTags: FunctionComponent<PostTagsProps> = ({ tags }) => {
	return (
		<Stack
			direction="row"
			sx={{
				minWidth: 0,
				overflowX: 'scroll',
				'::-webkit-scrollbar': {
					height: '6px',
				},
				'::-webkit-scrollbar-thumb:horizontal': {
					background: 'gray',
					borderRadius: '6px',
					cursor: 'grab',
				},
			}}
			gap={0.5}
			pb={1}
			whiteSpace={'nowrap'}
		>
			{tags ? (
				tags.map((tag) => (
					<Chip label={tag.name} key={`tag_${tag}`} clickable />
				))
			) : (
				<Chip label={'nada aqui'} variant="outlined" />
			)}
		</Stack>
	);
};

export default PostTags;
