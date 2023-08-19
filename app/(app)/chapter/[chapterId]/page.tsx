// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getChapterById, getListOfChapters } from "@/lib/dbApi";
import { ChaptersResponse } from "@/types/pocketbase-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { FunctionComponent } from "react";

interface PageProps {
	params: {
		chapterId: string;
	};
}

export const revalidate = 10;

/*
export const getStaticPaths: GetStaticPaths = async () => {
	const staticParams = await generateStaticParams();

	const paths = staticParams.map((params, idx) => ({
		params: { postId: params.slug },
	}));

	return {
		paths,
		fallback: false, // false or "blocking"
	};
};
*/
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
	const posts = chapter.expand.posts;

	return (
		<div>
			<h1>{chapter.title}</h1>
			Chapter id: {chapterId}
			<List></List>
			<ul>
				{posts.map((post: any) => (
					<Link
						href={`/chapter/${chapter.id}/post/${post.id}`}
						key={"link_to_post" + post.id}
					>
						<ListItem>
							<ListItemButton>
								<ListItemText primary={post.id} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default Page;
