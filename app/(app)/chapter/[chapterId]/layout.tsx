// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import Divider from '@mui/material/Divider/Divider';
import PostsList from './PostsList';
import React, { ReactNode } from 'react';
import DrawerController from './DrawerController';
import {
	getChapterById,
	getListOfChapters,
} from '@/lib/apiHelpers/chaptersAPI';
export const revalidate = 30;

export async function generateStaticParams() {
	const chapters = await getListOfChapters();

	return chapters.map((chapter) => ({
		chapterId: chapter.id,
	}));
}

export default async function Layout({
	params,
	children,
}: {
	params: { chapterId: string };
	children: ReactNode;
}) {
	const chapterId = params.chapterId;
	const chapter = await getChapterById(chapterId, true);
	const posts = chapter.expand?.posts;

	return (
		<Grid container flexGrow={1}>
			<DrawerController>
				<Paper sx={{ p: 3, my: 2 }}>
					<Typography
						variant="h5"
						fontWeight={700}
						pb={3}
						align="center"
					>
						{chapter.title}
					</Typography>
					<Divider />
					<Typography color="text.secondary" mt={3}>
						{chapter.description}
					</Typography>
				</Paper>
				<PostsList posts={posts} chapter={chapter} />
			</DrawerController>

			<Grid xs>{children}</Grid>
		</Grid>
	);
}
