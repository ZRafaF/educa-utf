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
