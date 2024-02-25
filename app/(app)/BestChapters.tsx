// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ChapterCard from '@/components/ChapterCard/ChapterCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import React from 'react';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { getBestChaptersOf } from '@/lib/apiHelpers/chaptersAPI';

export const revalidate = 0;

async function BestChapters() {
	const chapters = await getBestChaptersOf('month');

	return (
		<Box>
			<Typography variant="h5" fontWeight={700} pb={3}>
				Os melhores capítulos do mês
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
				{chapters.map((chapter, idx) => (
					<Grid
						key={`chapter_${idx}`}
						xs={6}
						sm={4}
						md={3}
						lg={2.4}
						xl={2.4}
					>
						<ChapterCard myChapter={chapter} isExpanded={false} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default BestChapters;
