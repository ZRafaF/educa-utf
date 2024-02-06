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
import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

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
	const selectorCallBack = (article: ArticlesResponse) => {
		handleClose();
		if (!editedChapter.expand) return;
		const itemsArray = editedChapter.expand?.articles ?? [];

		// if the article.id is already in the array, return
		if (itemsArray.find((a) => a.id === article.id)) {
			toast.error('Artigo já adicionado');
			return;
		}

		itemsArray.push(article);

		const tempCopy: ChaptersResponse<ChaptersExpand> = {
			...editedChapter,
		};

		if (tempCopy.expand) tempCopy.expand.articles = itemsArray;
		setEditedChapter(tempCopy);
		toast.success('Artigo adicionado');
	};

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
			<Dialog onClose={handleClose} open={open} fullWidth>
				<DialogTitle>Adicionar artigo</DialogTitle>
				<DialogContent
					sx={{
						py: 0,
						px: 1,
						overflowY: 'scroll',
					}}
				>
					<Box
						width={'100%'}
						justifyContent={'center'}
						gap={3}
						py={2}
						sx={{
							overflowX: 'hidden',
						}}
					>
						<ArticleSelector callback={selectorCallBack} />
					</Box>
				</DialogContent>
				<DialogActions
					sx={{
						p: 1,
					}}
				>
					<Box
						display={'flex'}
						width={'100%'}
						justifyContent={'flex-end'}
						gap={3}
					>
						<Box gap={1} display={'flex'}>
							<Button variant="outlined" onClick={handleClose}>
								Cancelar
							</Button>
						</Box>
					</Box>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ArticleAdder;
