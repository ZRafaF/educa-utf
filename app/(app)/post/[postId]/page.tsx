// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import PostComponent from '@/components/PostComponent/PostComponent';
import PostContent from '@/components/PostComponent/PostContent/PostContent';
import { getListOfPosts, getPostById } from '@/lib/dbApi';
import { PostsResponse } from '@/types/pocketbase-types';
import { FunctionComponent } from 'react';

interface PageProps {
	params: {
		postId: string;
	};
}

export const revalidate = 10;

export async function generateStaticParams() {
	const posts = await getListOfPosts().catch(() => [] as PostsResponse[]);

	return posts.map((post) => ({
		postId: post.id,
	}));
}

const Page: FunctionComponent<PageProps> = async ({ params }) => {
	const postId = params.postId;
	const post = await getPostById(postId);
	return <PostComponent myPost={post} />;
};

export default Page;
