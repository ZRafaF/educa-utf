// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getListOfPosts, getPostById } from "@/lib/dbApi";
import { GetStaticPaths } from "next";
import { FunctionComponent } from "react";

interface PageProps {
	params: {
		slug: string;
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
	const posts = await getListOfPosts();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const parts = params.slug.split("-");
	const postId = parts[parts.length - 1];
	const post = await getPostById(postId);
	return (
		<div>
			{params.slug}
			<div>{post.title}</div>
		</div>
	);
};

export default Page;
