// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import { getListOfChaptersStats } from '@/lib/apiHelpers/chaptersAPI';
import ChapterCard from '../ChapterCard/ChapterCard';
import { getRandomImageUrl } from '@/lib/helper';

interface ChaptersTableProps {
	searchParams?: { [key: string]: string | string[] | undefined };
}

const ChaptersTable: FunctionComponent<ChaptersTableProps> = async ({
	searchParams,
}) => {
	const sort = searchParams?.sort ?? '-created';
	const page = Number(searchParams?.page ?? 1);
	const items = Number(searchParams?.items ?? 25);

	const chapters = await getListOfChaptersStats(page, items, {
		sort: sort,
		expand: 'tags',
	});

	return (
		<>
			<Typography>
				Capítulos recuperados: {chapters.totalItems}
			</Typography>
			<Grid
				container
				spacing={1}
				sx={{
					justifyContent: {
						xs: 'center',
						sm: 'left',
						md: 'space-between',
						lg: 'space-between',
					},
				}}
			>
				{chapters.items.map((chapter, idx) => (
					<Grid
						key={`chapter_${idx}`}
						xs={6}
						sm={4}
						md={3}
						lg={2.4}
						xl={2.4}
					>
						<ChapterCard
							myChapter={chapter}
							isExpanded={false}
							imgSrc={getRandomImageUrl()}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default ChaptersTable;
