// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getListOfPosts, getPostById } from "@/lib/dbApi";
import { GetStaticPaths } from "next";
import { FunctionComponent } from "react";

interface PageProps {
	params: {
		postId: string;
	};
}

export const revalidate = 10;

// export const getStaticPaths: GetStaticPaths = async () => {
// 	const staticParams = await generateStaticParams();

// 	const paths = staticParams.map((params) => ({
// 		params: { postId: params.postId },
// 	}));

// 	return {
// 		paths,
// 		fallback: false, // false or "blocking"
// 	};
// };

export async function generateStaticParams() {
	const posts = await getListOfPosts();

	return posts.map((post) => ({
		postId: post.id,
	}));
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const post = await getPostById(params.postId);
	return (
		<div>
			{params.postId}
			<div>{post.created}</div>
		</div>
	);
};

export default Page;
