// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
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
	const pathname = usePathname();
	const router = useRouter();

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
					<Stack spacing={1} px={2}>
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
								py={1}
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
							py={1}
						>
							{chapter.title}
						</Typography>

						<Divider />
						{editMode && (
							<Typography
								color="text.secondary"
								suppressContentEditableWarning={true}
								contentEditable={editMode}
								py={1}
								sx={{
									':hover': {
										border: editMode ? 1 : 0,
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
							py={1}
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
					<Stack direction="row" alignItems="end" px={1} spacing={1}>
						<TagsComponent
							tag={chapter.expand?.tag}
							keyWords={chapter.expand?.key_words}
							expanded
						/>
						{editMode && (
							<Box pb={1}>
								<IconButton aria-label="edit-tag-and-keywords">
									<EditIcon fontSize="small" />
								</IconButton>
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
							backgroundImage: `url(${getChapterCoverURL(
								chapter,
								true
							)})`,
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
						<MoreChapterOptions
							chapter={chapter}
							shareUrl={`https://educautf.td.utfpr.edu.br/chapter/${chapter.id}`}
							placement="left"
							size="medium"
						/>
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
									router.replace(pathname);
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
		</>
	);
};

export default ChapterInspectorHeader;
