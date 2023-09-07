// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getChapterById, getListOfChapters } from "@/lib/dbApi";
import { ChaptersResponse, PostsResponse } from "@/types/pocketbase-types";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import Divider from "@mui/material/Divider/Divider";
import PostsList from "./PostsList";
import React from "react";
import { FunctionComponent } from "react";
import Toolbar from "@mui/material/Toolbar/Toolbar";

interface PageProps {
	params: {
		chapterId: string;
	};
}
//export const dynamic = "force-dynamic";
export const revalidate = 10;

export async function generateStaticParams() {
	const chapters = await getListOfChapters().catch((error) => {
		return [] as ChaptersResponse[];
	});

	return chapters.map((chapter) => ({
		chapterId: chapter.id,
	}));
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const chapterId = params.chapterId;
	const chapter = await getChapterById(chapterId, true);
	const posts = chapter.expand?.posts;

	return (
		<React.Fragment>
			<Paper sx={{ p: 3 }}>
				<Typography variant="h5" fontWeight={700} pb={3} align="center">
					{chapter.title}
				</Typography>
				<Divider />
				<Typography color="text.secondary" mt={3}>
					{chapter.description}
				</Typography>
			</Paper>
			<Toolbar />
			<PostsList posts={posts} chapter={chapter} />
		</React.Fragment>
	);
};

export default Page;
