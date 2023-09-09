// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostsStatsResponse, PostsResponse } from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';
import { PostsExpand } from '@/types/expanded-types';

export async function getListOfPosts() {
	try {
		return await pb.collection('posts').getFullList<PostsResponse>({
			skipTotal: true,
		});
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getPostById(id: string) {
	return pb.collection('posts').getOne<PostsResponse<PostsExpand>>(id, {
		skipTotal: true,
		expand: 'tags',
	});
}

export async function getPostStatsById(postId: string) {
	return pb.collection('post_stats').getOne<PostsStatsResponse>(postId, {
		skipTotal: true,
	});
}

// export async function getPostsSorted(qnt: number, sortBy: string = '-created') {
// 	try {
// 		const response = await pb
// 			.collection('posts')
// 			.getList<PostsResponse<PostsExpand>>(1, qnt, {
// 				sort: sortBy,
// 				skipTotal: true,
// 			});
// 		return response.items;
// 	} catch (error) {
// 		console.error(error);
// 		return [];
// 	}
// }

export async function getBestPostsOf(time: 'week' | 'month' | 'year') {
	try {
		return await pb
			.collection('posts')
			.getFullList<PostsResponse<PostsExpand>>({
				skipTotal: true,
				expand: 'tags',
			});
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getNewPosts() {
	try {
		const response = await pb
			.collection('posts')
			.getList<PostsResponse<PostsExpand>>(1, 8, {
				sort: '-created',
				skipTotal: true,
				expand: 'tags',
			});
		return response.items;
	} catch (error) {
		console.error(error);
		return [];
	}
}
export async function getPostDocumentUrl(
	postId: string,
	postCollectionId: string,
	postCollectionName: string,
	postDocumentName: string
) {
	const record = {
		id: postId,
		collectionId: postCollectionId,
		collectionName: postCollectionName,
	};

	return pb.files.getUrl(record, postDocumentName, {});
}
