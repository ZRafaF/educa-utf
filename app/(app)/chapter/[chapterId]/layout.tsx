// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import ArticlesList from './ArticlesList';
// import { getListOfChapters } from '@/lib/apiHelpers/chaptersAPI';

// export const revalidate = 30;

// export async function generateStaticParams() {
// 	const chapters = await getListOfChapters();

// 	return chapters.map((chapter) => ({
// 		chapterId: chapter.id,
// 	}));
// }

export default function Layout({
	params,
	children,
}: {
	params: { chapterId: string };
	children: ReactNode;
}) {
	return (
		<Grid container flexGrow={1}>
			<ArticlesList chapterId={params.chapterId} />
			<Grid xs>{children}</Grid>
		</Grid>
	);
}
