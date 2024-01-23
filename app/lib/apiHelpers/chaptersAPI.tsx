// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChaptersExpand, ChaptersExpandTags } from '@/types/expanded-types';
import pb from '../PocketBase/pocketbase';
import {
	ChaptersRecord,
	ChaptersResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import { ListResult, RecordOptions } from 'pocketbase';
import { getFormData } from '../helper';

export async function getFullListOfChapters(expand: boolean = false) {
	try {
		return await pb
			.collection('chapters')
			.getFullList<ChaptersResponse<ChaptersExpand>>({
				skipTotal: true,
				expand: expand ? 'articles' : undefined,
				batch: 9999,
			});
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getBestChaptersOf(time: 'week' | 'month' | 'year') {
	try {
		const result = await pb
			.collection('chapters')
			.getList<ChaptersResponse<ChaptersExpandTags>>(1, 15, {
				skipTotal: true,
				expand: 'tag, key_words',
			});
		return result.items;
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
			expand: expand ? 'articles' : undefined,
		});
}

export async function getFirstChapterByFilter(filter: string) {
	return await pb
		.collection('chapters')
		.getFirstListItem<ChaptersResponse>(filter, {
			skipTotal: true,
		});
}

export async function getChaptersStatsById(chapterId: string) {
	return pb
		.collection('chapters_stats')
		.getOne<ChaptersStatsResponse>(chapterId, {
			skipTotal: true,
		});
}

export async function getRandomChapter() {
	try {
		const list = await pb.collection('chapters').getList(1, 1, {
			filter: 'visibility = "public"',
			sort: '@random',
		});
		return list.items;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getListOfChaptersStats(
	page: number,
	itemsPerPage: number,
	options: RecordOptions | undefined
) {
	try {
		return await pb
			.collection('chapters_stats')
			.getList<ChaptersStatsResponse<ChaptersExpandTags>>(
				page,
				itemsPerPage,
				{
					...options,
					expand: 'tag, key_words',
				}
			);
	} catch (error) {
		console.error(error);
		return {} as ListResult<ChaptersStatsResponse<ChaptersExpandTags>>;
	}
}

export async function getNewChapters() {
	try {
		const response = await pb
			.collection('chapters')
			.getList<ChaptersResponse<ChaptersExpandTags>>(1, 8, {
				sort: '-created',
				skipTotal: true,
				expand: 'tag, key_words',
			});
		return response.items;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export function getChapterCoverURL(
	chapter: ChaptersResponse | ChaptersStatsResponse,
	original?: boolean
) {
	const record = {
		id: chapter.id,
		collectionId: chapter.collectionId,
		collectionName: chapter.collectionName,
	};

	return pb.files.getUrl(
		record,
		chapter.cover,
		original ? {} : { thumb: '600x300' }
	);
}

export async function createChapter(
	newChapter: ChaptersRecord,
	cover: Blob,
	keyWords: string[]
) {
	const form = getFormData(newChapter);
	form.append('cover', cover, 'cover.png');

	for (const word of keyWords) {
		form.append('key_words', word);
	}
	return await pb.collection('chapters').create<ChaptersResponse>(form);
}

export async function deleteChapter(chapterId: string) {
	return await pb.collection('chapters').delete(chapterId);
}
