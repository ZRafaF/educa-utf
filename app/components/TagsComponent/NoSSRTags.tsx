// Copyright (c) 2024 Rafael Farias
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
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NoSSRTagsProps {
	keyWords: KeyWordsRecord[] | undefined;
	tag: TagsResponse | undefined;
	expanded?: boolean;
}

const NoSSRTags: FunctionComponent<NoSSRTagsProps> = ({
	keyWords,
	tag,
	expanded,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const router = useRouter();
	const open = Boolean(anchorEl);

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

	if (tag === undefined) {
		return (
			<Chip
				size="small"
				label={'nada aqui'}
				variant="outlined"
				sx={{ mb: expanded ? 1 : 0 }}
			/>
		);
	}

	if (expanded) {
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
				<Chip
					size="small"
					label={tag.name}
					key={`tag_list${tag.name}`}
					clickable
					color="primary"
					component={Link}
					href={`/browse/articles?filter=tag='${tag.id}'`}
				/>
				{keyWords?.map((keyWord, idx) => (
					<Chip
						size="small"
						label={keyWord.word}
						key={`tag_${keyWord.word}_${idx}`}
						variant="outlined"
					/>
				))}
			</Stack>
		);
	}

	return (
		<Stack direction="row" gap={0.5} alignItems="center">
			<Chip
				size="small"
				label={tag.name}
				key={`tag_list${tag.name}`}
				clickable
				color="primary"
				onMouseDown={(event) => {
					event.stopPropagation();
					event.preventDefault();
				}}
				onClick={(event) => {
					event.stopPropagation();
					router.push(`/browse/articles?filter=tag='${tag.id}'`);
				}}
			/>
			{keyWords && keyWords.length > 0 && (
				<ClickAwayListener
					onClickAway={() => {
						setAnchorEl(null);
					}}
				>
					<div>
						<Tooltip
							PopperProps={{
								disablePortal: true,
							}}
							onClose={handleClose}
							open={open}
							disableFocusListener
							disableTouchListener
							disableHoverListener
							title={
								<span
									style={{
										whiteSpace: 'pre-line',
									}}
								>
									{keyWords.map((keyWord, idx) => (
										<Typography
											key={`tag_exp${keyWord.word}_${idx}`}
											variant="caption"
										>
											• {keyWord.word} {'\n'}
										</Typography>
									))}
								</span>
							}
							arrow
						>
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
									if (open) handleClose(event);
									else handleClick(event);
								}}
							/>
						</Tooltip>
					</div>
				</ClickAwayListener>
			)}
		</Stack>
	);
};

export default NoSSRTags;
