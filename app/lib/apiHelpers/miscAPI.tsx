// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import pb from '../PocketBase/pocketbase';

export async function increaseViews(
	collectionName: string,
	recordId: string
): Promise<string> {
	const res = await pb.send('/api/educautf/views', {
		method: 'POST',
		body: JSON.stringify({
			collectionName: collectionName,
			recordId: recordId,
		}),
	});

	return res.message;
}
