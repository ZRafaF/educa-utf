// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import TagPicker from '@/components/EditMetadata/TagPicker';
import KeyWordsPicker from '@/components/KeyWordsPicker/KeyWordsPicker';
import { ChaptersExpand } from '@/types/expanded-types';
import { ChaptersResponse } from '@/types/pocketbase-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import { Backdrop, MenuList } from '@mui/material';

interface TagsKeywordsEditorProps {
	editedChapter: ChaptersResponse<ChaptersExpand>;
	setEditedChapter: Dispatch<
		SetStateAction<ChaptersResponse<ChaptersExpand> | undefined>
	>;
}

const TagsKeywordsEditor: FunctionComponent<TagsKeywordsEditorProps> = ({
	editedChapter,
	setEditedChapter,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	// const [isOpen, setIsOpen] = useState(false);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const open = Boolean(anchorEl);

	const handleClose = () => {
		// setIsOpen(false);
		setAnchorEl(null);
	};
	return (
		<>
			<Box pb={1}>
				<Tooltip
					title="Editar tags e palavras-chave"
					arrow
					placement="right"
				>
					<Button
						endIcon={<EditIcon fontSize="small" />}
						onClick={handleClick}
						// onClick={() => {
						// 	setIsOpen(true);
						// }}
						variant="outlined"
						size="small"
					>
						Editar Tag e Palavras-chave
					</Button>
				</Tooltip>
			</Box>
			{/* <Dialog onClose={handleClose} open={isOpen} keepMounted>
				<DialogTitle>Editar Tag e Palavras-chave</DialogTitle>
				<DialogContent
					sx={{
						p: 1,
					}}
				>
					<Grid container spacing={3} m={0}>
						<Grid xs={12}>
							<TagPicker defaultTag={editedChapter.expand?.tag} />
						</Grid>
						<Grid xs={12}>
							<KeyWordsPicker
								defaultKeyWords={
									editedChapter.expand?.key_words
								}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions
					sx={{
						p: 2,
					}}
				>
					<Button
						type="submit"
						onClick={() => {
							handleClose();
						}}
						variant="contained"
					>
						Feito
					</Button>
				</DialogActions>
			</Dialog> */}
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				disableScrollLock
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				sx={{
					maxWidth: 600,
				}}
				keepMounted
			>
				<MenuList
					sx={{
						px: 2,
					}}
				>
					<TagPicker defaultTag={editedChapter.expand?.tag} />
				</MenuList>
				<MenuList
					sx={{
						px: 2,
					}}
				>
					<KeyWordsPicker
						defaultKeyWords={editedChapter.expand?.key_words}
					/>
				</MenuList>
				<MenuList
					sx={{
						px: 2,
						justifyContent: 'end',
						display: 'flex',
					}}
				>
					<Button
						onClick={() => {
							handleClose();
						}}
						variant="contained"
					>
						Feito
					</Button>
				</MenuList>
			</Menu>
		</>
	);
};

export default TagsKeywordsEditor;
