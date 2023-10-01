// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ReactNode } from 'react';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import dynamic from 'next/dynamic';

const NoSSRArticleList = dynamic(() => import('./ArticlesList'), {
	ssr: false,
});
export default function Layout({
	params,
	children,
}: {
	params: { slug: string[] };
	children: ReactNode;
}) {
	const chapterId = params.slug[0];

	return (
		<Grid container flexGrow={1}>
			<NoSSRArticleList chapterId={chapterId} />
			<Grid xs>{children} </Grid>
		</Grid>
	);
}
