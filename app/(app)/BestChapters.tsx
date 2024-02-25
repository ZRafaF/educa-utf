// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import ChapterCard from '@/components/ChapterCard/ChapterCard';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import React from 'react';
import { getBestChaptersOf } from '@/lib/apiHelpers/chaptersAPI';
import FadeInAnimation from '@/components/FadeInAnimation/FadeInAnimation';

export const revalidate = 0;

async function BestChapters() {
	const chapters = await getBestChaptersOf('month');

	return (
		<>
			{chapters.map((chapter, idx) => (
				<Grid
					key={`chapter_${idx}`}
					xs={6}
					sm={4}
					md={3}
					lg={2.4}
					xl={2.4}
				>
					<FadeInAnimation
						// Random number between 300 - 600
						durationMs={Math.floor(Math.random() * 300) + 300}
					>
						<ChapterCard myChapter={chapter} isExpanded={false} />
					</FadeInAnimation>
				</Grid>
			))}
		</>
	);
}

export default BestChapters;
