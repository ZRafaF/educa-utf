// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getListOfPosts } from "@/lib/PocketBase/dbApi";
import { PostsResponse } from "@/types/pocketbase-types";
import { FunctionComponent } from "react";

interface PageProps {
	params: {
		postId: string;
		post: PostsResponse;
	};
}

export const revalidate = 10;

export async function generateStaticParams() {
	const posts = await getListOfPosts();

	return posts.map((post) => ({
		postId: post.id,
		post: post,
	}));
}

const Page: FunctionComponent<PageProps> = ({ params }) => {
	return (
		<div>
			{params.postId}
			<div>{params.post.title}</div>
		</div>
	);
};

export default Page;
