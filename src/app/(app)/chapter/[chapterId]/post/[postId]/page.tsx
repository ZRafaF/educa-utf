// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getListOfPosts, getPostById } from "@/lib/dbApi";
import { PostsResponse } from "@/types/pocketbase-types";
import { GetStaticPaths } from "next";
import { FunctionComponent } from "react";

interface PageProps {
	params: {
		postId: string;
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
	const posts = await getListOfPosts().catch(() => [] as PostsResponse[]);

	return posts.map((post) => ({
		postId: post.id,
	}));
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const postId = params.postId;
	try {
		const post = await getPostById(postId);
		return (
			<div>
				{postId}
				<div>{post.title}</div>
			</div>
		);
	} catch (error) {
		return <h1>Essa página não existe</h1>;
	}
};

export default Page;
