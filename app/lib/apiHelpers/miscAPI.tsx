// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import pb from '../PocketBase/pocketbase';
import {
	IncreaseViewsResponseType,
	UpdateLikedRecordsResponseType,
} from '@/types/miscAPI-types';

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

		if (search === '') return undefined;

		return search ? `slug~'%${search}%'` : '';
	})();

	const filters: string[] = [];

	if (tagsString) filters.push(tagsString);
	if (searchString) filters.push(searchString);

	return filters.join('&&');
}
