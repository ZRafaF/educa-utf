// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { splitStringByComma } from '@/lib/helper';
import Chip from '@mui/material/Chip/Chip';
import Stack from '@mui/material/Stack/Stack';
import { FunctionComponent } from 'react';

interface PostTagsProps {
	tags: string;
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
			pb={1}
			whiteSpace={'nowrap'}
		>
			{splitStringByComma(tags).map((tag) => {
				return <Chip label={tag} key={`tag_${tag}`} clickable />;
			})}
			<Chip label={'asd'} clickable />
			<Chip label={'asd'} clickable />
			<Chip label={'asd'} clickable />
		</Stack>
	);
};

export default PostTags;
