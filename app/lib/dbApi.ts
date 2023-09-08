// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChaptersResponse } from '@/types/pocketbase-types';
import pb from './PocketBase/pocketbase';
import { ChaptersExpand } from '@/types/expanded-types';

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

export function getUser() {
	return pb.authStore;
}

export function isLoggedIn() {
	return pb.authStore.isValid;
}
