// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import List from '@mui/material/List/List';
import Divider from '@mui/material/Divider/Divider';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar/ListItemAvatar';
import Avatar from '@mui/material/Avatar/Avatar';
import React from 'react';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import Link from 'next/link';
import Box from '@mui/material/Box/Box';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import {
	ArticlesResponse,
	ArticlesVisibilityOptions,
	ChaptersResponse,
} from '@/types/pocketbase-types';
import { ChaptersExpand } from '@/types/expanded-types';
import { getChapterById } from '@/lib/apiHelpers/chaptersAPI';
import DrawerController from './DrawerController';
import Tooltip from '@mui/material/Tooltip';
import { getFormattedVisibility } from '@/lib/helper';
import Stack from '@mui/material/Stack';

interface ArticlesListProps {
	chapterId: string;
}

const ArticlesList: FunctionComponent<ArticlesListProps> = ({ chapterId }) => {
	const [chapter, setChapter] = useState<ChaptersResponse<ChaptersExpand>>();

	useEffect(() => {
		try {
			getChapterById(chapterId, true).then((chapterResponse) => {
				if (chapterResponse) setChapter(chapterResponse);
			});
		} catch (error) {}
	}, [chapterId]);

	return (
		<DrawerController>
			<Paper sx={{ p: 3, my: 2 }} variant="outlined">
				<Typography variant="h5" fontWeight={700} pb={3} align="center">
					{chapter?.title}
				</Typography>
				<Divider />
				<Typography color="text.secondary" mt={3}>
					{chapter?.description}
				</Typography>
			</Paper>
			<List sx={{ width: '100%' }}>
				<Divider component="li" />
				{chapter?.expand?.articles?.map((post: ArticlesResponse) => (
					<Box
						key={'link_to_article' + post.id}
						sx={{
							bgcolor:
								post.visibility ===
								ArticlesVisibilityOptions.private
									? 'rgba(130, 130, 130, 0.15)'
									: 'initial',
							opacity:
								post.visibility ===
								ArticlesVisibilityOptions.private
									? 0.7
									: 1,
						}}
						my={1}
						color={'text.primary'}
					>
						<ListItemButton
							LinkComponent={Link}
							href={`/chapter/${chapter.id}/${post.id}`}
						>
							<ListItemAvatar>
								<Avatar variant="square">N</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={post.title}
								secondary={
									<>
										{post.description}
										<Stack direction="row" spacing={2}>
											<Tooltip title="Visibilidade" arrow>
												<Typography
													variant="subtitle2"
													component="p"
													fontWeight={600}
													color={
														post.visibility ===
														'public'
															? 'success.main'
															: 'text.secondary'
													}
												>
													{getFormattedVisibility(
														post.visibility
													)}
												</Typography>
											</Tooltip>
										</Stack>
									</>
								}
							/>
						</ListItemButton>
						<Divider component="li" />
					</Box>
				))}
			</List>
		</DrawerController>
	);
};

export default ArticlesList;
