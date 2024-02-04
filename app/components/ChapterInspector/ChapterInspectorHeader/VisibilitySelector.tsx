// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { getFormattedVisibility } from '@/lib/helper';
import { ChaptersExpand } from '@/types/expanded-types';
import {
	ChaptersResponse,
	ChaptersVisibilityOptions,
} from '@/types/pocketbase-types';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

interface VisibilitySelectorProps {
	editedChapter: ChaptersResponse<ChaptersExpand>;
	setEditedChapter: Dispatch<
		SetStateAction<ChaptersResponse<ChaptersExpand> | undefined>
	>;
	chapter: ChaptersResponse<ChaptersExpand>;
	editMode: boolean;
}

const VisibilitySelector: FunctionComponent<VisibilitySelectorProps> = ({
	editedChapter,
	setEditedChapter,
	chapter,
	editMode,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<Tooltip title="Visibilidade" arrow>
				<Box
					position={'absolute'}
					top={0}
					left={0}
					m={1}
					color={
						editedChapter.visibility === 'public'
							? 'success.main'
							: 'text.secondary'
					}
				>
					{editMode ? (
						<Button
							sx={{
								textTransform: 'none',
								fontWeight: 'inherit',
								fontSize: 'inherit',
								p: 0.5,
							}}
							onClick={handleClick}
							color="inherit"
							size="small"
							endIcon={
								<EditIcon
									sx={{
										fontSize: 'medium',
									}}
								/>
							}
						>
							<Typography
								fontWeight={600}
								variant="subtitle2"
								color="inherit"
							>
								{getFormattedVisibility(
									editedChapter.visibility
								)}
							</Typography>
						</Button>
					) : (
						<Typography
							fontWeight={600}
							variant="subtitle2"
							color="inherit"
							p={0.5}
						>
							{getFormattedVisibility(chapter.visibility)}
						</Typography>
					)}
				</Box>
			</Tooltip>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				disableScrollLock
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem
					onClick={() => {
						setEditedChapter({
							...editedChapter,
							visibility: ChaptersVisibilityOptions.public,
						});
						handleClose();
					}}
				>
					<Typography
						fontWeight={600}
						variant="subtitle2"
						color="success.main"
					>
						Publico
					</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => {
						setEditedChapter({
							...editedChapter,
							visibility: ChaptersVisibilityOptions.private,
						});
						handleClose();
					}}
				>
					<Typography
						fontWeight={600}
						variant="subtitle2"
						color="text.secondary"
					>
						Privado
					</Typography>
				</MenuItem>
			</Menu>
		</>
	);
};

export default VisibilitySelector;
