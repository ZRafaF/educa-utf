// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { TagsResponse } from '@/types/pocketbase-types';
import Chip from '@mui/material/Chip/Chip';
import Stack from '@mui/material/Stack/Stack';
import { FunctionComponent } from 'react';

interface TagsComponentProps {
	tags: TagsResponse[] | undefined;
}

const TagsComponent: FunctionComponent<TagsComponentProps> = ({ tags }) => {
	return (
		<Stack
			direction="row"
			sx={{
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
		>
			{tags ? (
				tags.map((tag) => (
					<Chip
						size="small"
						label={tag.name}
						key={`tag_${tag.name}`}
						clickable
						onMouseDown={(event) => event.stopPropagation()}
						onClick={(event) => {
							event.stopPropagation();
							event.preventDefault();
							console.log('Button clicked');
						}}
					/>
				))
			) : (
				<Chip size="small" label={'nada aqui'} variant="outlined" />
			)}
		</Stack>
	);
};

export default TagsComponent;
