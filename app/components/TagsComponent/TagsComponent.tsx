// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { KeyWordsRecord, TagsResponse } from '@/types/pocketbase-types';
import Chip from '@mui/material/Chip/Chip';
import Stack from '@mui/material/Stack/Stack';
import { FunctionComponent, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Popover from '@mui/material/Popover';

interface TagsComponentProps {
	keyWords: KeyWordsRecord[] | undefined;
	tag: TagsResponse | undefined;
	expanded?: boolean;
}

const TagsComponent: FunctionComponent<TagsComponentProps> = ({
	keyWords,
	tag,
	expanded,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleClick = (event: any) => {
		event.stopPropagation();
		event.preventDefault();

		setAnchorEl(event.currentTarget);
	};
	const handleClose = (event: any) => {
		event.stopPropagation();
		event.preventDefault();

		setAnchorEl(null);
	};

	if (tag === undefined || keyWords === undefined)
		return (
			<Chip
				size="small"
				label={'nada aqui'}
				variant="outlined"
				sx={{ mb: 2 }}
			/>
		);

	if (expanded)
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
				{keyWords?.map((keyWord) => (
					<Chip
						size="small"
						label={keyWord.word}
						key={`tag_${keyWord.word}`}
						clickable
						onMouseDown={(event) => event.stopPropagation()}
						onClick={(event: any) => {
							event.stopPropagation();
							event.preventDefault();
							console.log('Button clicked');
						}}
					/>
				))}
			</Stack>
		);

	return (
		<Stack direction="row" gap={0.5}>
			<Chip
				size="small"
				label={tag.name}
				key={`tag_list${tag.name}`}
				clickable
				onMouseDown={(event) => event.stopPropagation()}
				onClick={(event) => {
					event.stopPropagation();
					event.preventDefault();
					console.log('Button clicked');
				}}
			/>
			{keyWords.length > 0 && (
				<>
					<Chip
						size="small"
						icon={
							anchorEl ? (
								<ExpandLessIcon fontSize="large" />
							) : (
								<ExpandMoreIcon fontSize="large" />
							)
						}
						label={`+${keyWords.length}`}
						clickable
						sx={{
							color: 'text.secondary',
						}}
						onMouseDown={(event) => event.stopPropagation()}
						onClick={(event) => {
							event.stopPropagation();
							event.preventDefault();
							handleClick(event);
						}}
					/>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						disableScrollLock
					>
						<Stack
							spacing={1}
							sx={{
								p: 1,
							}}
						>
							{keyWords.map((keyWord, idx) => (
								<Chip
									size="small"
									label={keyWord.word}
									key={`tag_exp${keyWord.word}_${idx}`}
									clickable
									onMouseDown={(event) =>
										event.stopPropagation()
									}
									onClick={(event) => {
										event.stopPropagation();
										event.preventDefault();
										handleClose(event);
										console.log('Button clicked');
									}}
								/>
							))}
						</Stack>
					</Popover>
				</>
			)}
		</Stack>
	);
};

export default TagsComponent;
