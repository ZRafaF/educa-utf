// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChaptersResponse, PostsResponse } from '@/types/pocketbase-types';
import pb from './PocketBase/pocketbase';

type ChaptersExpand = {
	posts: PostsResponse[];
};

export function getListOfPosts() {
	return pb.collection('posts').getFullList<PostsResponse>({
		skipTotal: true,
	});
}

export async function getSomePostsSorted(
	qnt: number,
	sortBy: string = '-created'
) {
	const response = await pb
		.collection('posts')
		.getList<PostsResponse>(1, qnt, {
			sort: sortBy,
			skipTotal: true,
		});
	return response.items;
}

export function getPostById(id: string) {
	return pb.collection('posts').getOne<PostsResponse>(id);
}

export async function getListOfChapters(expand: boolean = false) {
	return pb
		.collection('chapters')
		.getFullList<ChaptersResponse<ChaptersExpand>>({
			skipTotal: true,
			expand: expand ? 'posts' : undefined,
		});
}

export function getChapterById(id: string, expand: boolean = false) {
	return pb
		.collection('chapters')
		.getOne<ChaptersResponse<ChaptersExpand>>(id, {
			skipTotal: true,
			expand: expand ? 'posts' : undefined,
		});
}

export function getFirstChapterByFilter(filter: string) {
	return pb
		.collection('chapters')
		.getFirstListItem<ChaptersResponse>(filter, {
			skipTotal: true,
		});
}

export function getPostDocumentUrl(
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

export function getUser() {
	return pb.authStore;
}

export function isLoggedIn() {
	return pb.authStore.isValid;
}
