// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getListOfChapters } from "@/lib/dbApi";
import { ChaptersResponse } from "@/types/pocketbase-types";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2
import React from "react";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import ChapterCard from "@/components/ChapterCard/ChapterCard";

export const revalidate = 10;

async function getBestChapters() {
	const posts = await getListOfChapters().catch((error) => {
		return [] as ChaptersResponse[];
	});
	return posts;
}

async function BestChapters() {
	const chapters = await getBestChapters();
	return (
		<Box>
			<Typography variant="h5" fontWeight={700} pb={3}>
				Os melhores capítulos do mês
			</Typography>
			<Grid
				container
				spacing={2}
				sx={{
					justifyContent: {
						xs: "center",
						sm: "center",
						lg: "left",
					},
				}}
			>
				{chapters.map((chapter, idx) => (
					<Grid
						key={`chapter_${idx}`}
						xs={6}
						sm={4}
						md={4}
						lg={3}
						xl={3}
					>
						<ChapterCard myChapter={chapter} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default BestChapters;
