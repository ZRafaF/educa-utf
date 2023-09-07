// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostsResponse } from '@/types/pocketbase-types';
import PostContent from './PostContent/PostContent';
import { getPostDocumentUrl } from '@/lib/dbApi';

export const revalidate = 30;

async function getArticle(post: PostsResponse) {
	const markDownContent = await getPostDocumentUrl(
		post.id,
		post.collectionId,
		post.collectionName,
		post.document
	);
	try {
		return await fetch(markDownContent).then((response) => response.text());
	} catch (error) {
		return 'Não foi possível encontrar esse post :(';
	}
}

async function PostComponent({ myPost }: { myPost: PostsResponse }) {
	const article = await getArticle(myPost);

	return (
		<div>
			<div>{myPost.title}</div>
			<PostContent article={article} />
		</div>
	);
}

export default PostComponent;
