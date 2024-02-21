// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import pb from '../PocketBase/pocketbase';
import {
	IncreaseViewsResponseType,
	UpdateLikedRecordsResponseType,
} from '@/types/miscAPI-types';
import { slugify } from '../helper';

export async function increaseViews(
	collectionName: string,
	recordId: string
): Promise<string> {
	const res: IncreaseViewsResponseType = await pb.send(
		'/api/educautf/views',
		{
			method: 'POST',
			body: JSON.stringify({
				collectionName: collectionName,
				recordId: recordId,
			}),
		}
	);

	return res.message;
}

export async function updateLikedRecords(
	recordId: string,
	collectionName: 'articles' | 'chapters',
	action: 'add' | 'remove'
) {
	const res: UpdateLikedRecordsResponseType = await pb.send(
		'/api/educautf/likes',
		{
			method: 'POST',
			body: JSON.stringify({
				collectionName: collectionName,
				recordId: recordId,
				action: action,
			}),
		}
	);

	return res;
}

/**
 *
 * @param searchParams an object with the search parameters
 * @returns a string to be used as a filter in the API
 * @example
 * const searchParams = {
 * 	tags: ['tag1', 'tag2'],
 * 	search: 'search string',
 * }
 * const filterString = constructFilterString(searchParams)
 * // filterString = "tag='tag1'||tag='tag2'&&slug~'%search-string%'"
 * // This string can be used as a filter in the API
 * // Example: /api/educautf/articles?filter=tag='tag1'||tag='tag2'&&slug~'%search-string%'
 *
 */

export function constructFilterString(
	searchParams:
		| {
				[key: string]: string | string[] | undefined;
		  }
		| undefined
) {
	if (searchParams === undefined) {
		return '';
	}

	const tagsString = (() => {
		const tagsRaw = searchParams?.tags ?? '';

		if (tagsRaw === '') return undefined;

		const tags = tagsRaw instanceof Array ? tagsRaw : tagsRaw.split(',');
		return tags.map((tag) => `tag='${tag}'`).join('||');
	})();

	const searchString = (() => {
		const search = searchParams?.search ?? '';

		if (search === '' || search instanceof Array) return undefined;

		const sluggedSearch = slugify(search);

		return sluggedSearch
			? `(slug~'%${sluggedSearch}%' || description_slug~'%${sluggedSearch}%')`
			: '';
	})();

	const filters: string[] = [];

	if (tagsString) filters.push(tagsString);
	if (searchString) filters.push(searchString);

	const filterString = filters.join('&&');

	return filterString;
}
