// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChaptersExpand, ChaptersExpandTags } from '@/types/expanded-types';
import pb from '../PocketBase/pocketbase';
import { ChaptersResponse } from '@/types/pocketbase-types';

export async function getListOfChapters(expand: boolean = false) {
	try {
		return await pb
			.collection('chapters')
			.getFullList<ChaptersResponse<ChaptersExpand>>({
				skipTotal: true,
				expand: expand ? 'posts' : undefined,
			});
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getBestChaptersOf(time: 'week' | 'month' | 'year') {
	try {
		return await pb
			.collection('chapters')
			.getFullList<ChaptersResponse<ChaptersExpandTags>>({
				skipTotal: true,
				expand: 'tags',
			});
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getChapterById(id: string, expand: boolean = false) {
	return await pb
		.collection('chapters')
		.getOne<ChaptersResponse<ChaptersExpand>>(id, {
			skipTotal: true,
			expand: expand ? 'posts' : undefined,
		});
}

export async function getFirstChapterByFilter(filter: string) {
	return await pb
		.collection('chapters')
		.getFirstListItem<ChaptersResponse>(filter, {
			skipTotal: true,
		});
}
