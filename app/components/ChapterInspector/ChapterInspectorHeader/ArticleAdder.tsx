// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ArticleSelector from '@/components/ArticleSelector/ArticleSelector';
import { ChaptersExpand } from '@/types/expanded-types';
import { ArticlesResponse, ChaptersResponse } from '@/types/pocketbase-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Pagination from '@mui/material/Pagination';
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import Box from '@mui/material/Box';

interface ArticleAdderProps {
	editedChapter: ChaptersResponse<ChaptersExpand>;
	setEditedChapter: Dispatch<
		SetStateAction<ChaptersResponse<ChaptersExpand> | undefined>
	>;
}

const ArticleAdder: FunctionComponent<ArticleAdderProps> = ({
	editedChapter,
	setEditedChapter,
}) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const selectorCallBack = (article: ArticlesResponse) => {};

	return (
		<>
			<Button
				fullWidth
				color="success"
				variant="contained"
				onClick={handleClickOpen}
			>
				Adicionar Artigo
			</Button>
			<Dialog onClose={handleClose} open={open}>
				<DialogTitle>Adicionar artigo</DialogTitle>
				<DialogContent
				// sx={{
				// 	p: 1,
				// }}
				>
					<Grid container spacing={3}>
						<Grid xs={12}>
							<ArticleSelector callback={selectorCallBack} />
						</Grid>
						<Grid xs={12}></Grid>
					</Grid>
				</DialogContent>
				<DialogActions
					sx={{
						p: 2,
					}}
				>
					<Box
						display={'flex'}
						width={'100%'}
						justifyContent={'space-between'}
						gap={3}
					>
						<Pagination count={10} color="primary" />
						<Button variant="contained" onClick={handleClose}>
							Feito
						</Button>
					</Box>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ArticleAdder;
