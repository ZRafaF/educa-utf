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
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface TagsKeywordsEditorProps {
	handleClose: () => void;
	open: boolean;
	editedChapter: ChaptersResponse<ChaptersExpand>;
	setEditedChapter: Dispatch<
		SetStateAction<ChaptersResponse<ChaptersExpand> | undefined>
	>;
}

const TagsKeywordsEditor: FunctionComponent<TagsKeywordsEditorProps> = ({
	handleClose,
	open,
	editedChapter,
	setEditedChapter,
}) => {
	return (
		<Dialog onClose={handleClose} open={open} keepMounted>
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
							defaultKeyWords={editedChapter.expand?.key_words}
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
		</Dialog>
	);
};

export default TagsKeywordsEditor;
