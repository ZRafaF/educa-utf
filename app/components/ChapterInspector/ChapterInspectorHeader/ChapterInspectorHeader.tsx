// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import LikeButton from '@/components/LikeButton/LikeButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider/Divider';

import { getChapterCoverURL } from '@/lib/apiHelpers/chaptersAPI';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
	ChaptersResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import { ChaptersExpand } from '@/types/expanded-types';
import MoreChapterOptions from '@/components/MoreChapterOptions/MoreChapterOptions';
import Button from '@mui/material/Button';
import { usePathname, useRouter } from 'next/navigation';
import TagsComponent from '@/components/TagsComponent/TagsComponent';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TagsKeywordsEditor from './TagsKeywordsEditor';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CoverPickerDialog from './CoverPickerDialog';
import { ArticleCoverContext } from '@/contexts/ArticleCoverContext';
interface ChapterInspectorHeaderProps {
	chapter: ChaptersResponse<ChaptersExpand>;
	chapterStats: ChaptersStatsResponse;
	editMode: boolean;
	editedChapter: ChaptersResponse<ChaptersExpand>;
	setEditedChapter: Dispatch<
		SetStateAction<ChaptersResponse<ChaptersExpand> | undefined>
	>;
}

const ChapterInspectorHeader: FunctionComponent<
	ChapterInspectorHeaderProps
> = ({ chapter, chapterStats, editMode, editedChapter, setEditedChapter }) => {
	const router = useRouter();
	const [selectedCoverFile] = useContext(ArticleCoverContext);

	const [editTagsIsOpen, setEditTagsIsOpen] = useState(false);
	const [coverPickerIsOpen, setCoverPickerIsOpen] = useState(false);

	const backgroundImageUrl = useMemo(() => {
		if (selectedCoverFile) {
			return URL.createObjectURL(selectedCoverFile);
		}
		return getChapterCoverURL(chapter, true);
	}, [chapter, selectedCoverFile]);

	const handleCloseEditTags = () => {
		setEditTagsIsOpen(false);
	};
	const handleCloseCoverPicker = () => {
		setCoverPickerIsOpen(false);
	};

	return (
		<>
			<div data-mui-color-scheme="dark">
				<Box
					sx={{
						pt: { xs: 8, sm: 8, md: 4 },
						pb: 0,
					}}
					position={{ xs: 'inherit', sm: 'inherit', md: 'relative' }}
					color="text.primary"
					boxShadow={6}
				>
					<Stack spacing={1} px={2} pt={1}>
						{editMode && (
							<Typography
								variant="h5"
								fontWeight={700}
								align="center"
								width={'100%'}
								suppressContentEditableWarning={true}
								contentEditable={editMode}
								sx={{
									':hover': {
										border: editMode ? 1 : 0,
									},
								}}
								py={0.5}
								onInput={(e: any) => {
									setEditedChapter({
										...editedChapter,
										title: e.target.innerText,
									});
								}}
							>
								{chapter.title}
							</Typography>
						)}
						<Typography
							variant="h5"
							fontWeight={700}
							display={editMode ? 'none' : 'block'}
							align="center"
							width={'100%'}
							py={0.5}
						>
							{chapter.title}
						</Typography>

						<Divider />
						{editMode && (
							<Typography
								color="text.secondary"
								suppressContentEditableWarning={true}
								contentEditable={editMode}
								py={0.5}
								sx={{
									':hover': {
										border: 1,
									},
								}}
								onInput={(e: any) => {
									// setEditedDescription(e.target.innerText);
									setEditedChapter({
										...editedChapter,
										description: e.target.innerText,
									});
								}}
							>
								{chapter.description}
							</Typography>
						)}

						<Typography
							color="text.secondary"
							py={0.5}
							display={editMode ? 'none' : 'block'}
						>
							{chapter.description.length
								? chapter.description
								: 'Sem descrição...'}
						</Typography>

						<Divider />
						<Stack
							direction="row"
							justifyContent="space-around"
							alignItems="center"
						>
							<Tooltip
								title="Visualizações"
								arrow
								placement="left"
							>
								<Stack
									direction="row"
									spacing={1}
									alignItems="center"
									pl={1}
								>
									<VisibilityIcon color="action" />
									<Typography
										variant="subtitle2"
										component="p"
									>
										{chapterStats.views}
									</Typography>
								</Stack>
							</Tooltip>
							<LikeButton
								numberOfLikes={chapterStats.likes}
								item={{
									id: chapter?.id,
									type: 'chapters',
								}}
							/>
						</Stack>
					</Stack>
					<Stack
						direction="row"
						alignItems="end"
						justifyContent={'space-between'}
						px={1}
						spacing={1}
					>
						<TagsComponent
							tag={chapter.expand?.tag}
							keyWords={chapter.expand?.key_words}
							expanded
						/>
						{editMode && (
							<Box pb={1}>
								<Tooltip
									title="Editar tags e palavras-chave"
									arrow
									placement="right"
								>
									<IconButton
										aria-label="edit-tag-and-keywords"
										onClick={() => {
											setEditTagsIsOpen(true);
										}}
									>
										<EditIcon fontSize="small" />
									</IconButton>
								</Tooltip>
							</Box>
						)}
					</Stack>
					<Box
						position={'absolute'}
						top={0}
						left={0}
						right={0}
						bottom={0}
						zIndex={-1}
						sx={{
							backgroundImage: `url(${backgroundImageUrl})`,
							backgroundSize: 'cover',

							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat',
							boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.75)',
						}}
						bgcolor={'Background'}
					/>
					<Box
						position={'absolute'}
						top={0}
						left={0}
						right={0}
						bottom={0}
						zIndex={-1}
						sx={{
							backdropFilter: 'blur(3px)',
						}}
					/>
					<Box position={'absolute'} top={0} right={0} m={1}>
						{editMode ? (
							<Tooltip
								title="Trocar imagem de capa"
								arrow
								placement="right"
							>
								<IconButton
									size="small"
									onClick={() => {
										setCoverPickerIsOpen(true);
									}}
								>
									<AddPhotoAlternateIcon
										color="action"
										fontSize="medium"
									/>
								</IconButton>
							</Tooltip>
						) : (
							<MoreChapterOptions
								chapter={chapter}
								shareUrl={`https://educautf.td.utfpr.edu.br/chapter/${chapter.id}`}
								placement="left"
								size="medium"
							/>
						)}
					</Box>
				</Box>
			</div>
			{editMode && (
				<Box bgcolor={'background.default'} p={2}>
					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
						spacing={1}
						width={'100%'}
					>
						<Button fullWidth color="success" variant="contained">
							Adicionar Artigo
						</Button>
						<Stack
							direction="row"
							justifyContent="center"
							alignItems="center"
							spacing={2}
							width={'100%'}
						>
							<Button
								fullWidth
								color="primary"
								variant="outlined"
								onClick={() => {
									router.push(`/chapter/${chapter.id}`);
								}}
							>
								Cancelar
							</Button>
							<Button
								fullWidth
								color="primary"
								variant="contained"
							>
								Salvar
							</Button>
						</Stack>
					</Stack>
				</Box>
			)}
			<TagsKeywordsEditor
				handleClose={handleCloseEditTags}
				open={editTagsIsOpen}
				editedChapter={editedChapter}
				setEditedChapter={setEditedChapter}
			/>
			<CoverPickerDialog
				handleClose={handleCloseCoverPicker}
				open={coverPickerIsOpen}
			/>
		</>
	);
};

export default ChapterInspectorHeader;
