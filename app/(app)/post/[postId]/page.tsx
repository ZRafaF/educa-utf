// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PostComponent from '@/components/PostComponent/PostComponent';
import {
	getListOfPosts,
	getPostById,
	getPostStatsById,
} from '@/lib/apiHelpers/postsAPI';
import { FunctionComponent } from 'react';

interface PageProps {
	params: {
		postId: string;
	};
}

export const revalidate = 10;

export async function generateStaticParams() {
	const posts = await getListOfPosts();

	return posts.map((post) => ({
		postId: post.id,
	}));
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const postId = params.postId;
	const post = await getPostById(postId);
	const postStats = await getPostStatsById(post.id);
	return <PostComponent myPost={post} postStats={postStats} />;
};

export default Page;
