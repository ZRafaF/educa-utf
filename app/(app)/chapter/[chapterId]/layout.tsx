// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { getChapterById, getListOfChapters } from '@/lib/dbApi';
import { ChaptersResponse } from '@/types/pocketbase-types';
import Paper from '@mui/material/Paper/Paper';
import Typography from '@mui/material/Typography/Typography';
import Divider from '@mui/material/Divider/Divider';
import PostsList from './PostsList';
import React, { ReactNode } from 'react';
import { FunctionComponent } from 'react';
import Toolbar from '@mui/material/Toolbar/Toolbar';

export const revalidate = 10;

export async function generateStaticParams() {
	const chapters = await getListOfChapters().catch((error) => {
		return [] as ChaptersResponse[];
	});

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
		<section>
			<Grid container minHeight={'90vh'}>
				<Grid
					sx={{
						backgroundColor: '#F2F2F2',
						width: 350,
					}}
					p={2}
					boxShadow={3}
				>
					<Paper sx={{ p: 3 }}>
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
					<Toolbar />
					<PostsList posts={posts} chapter={chapter} />
				</Grid>

				<Grid xs>
					<Container>{children}</Container>
				</Grid>
			</Grid>
		</section>
	);
}
