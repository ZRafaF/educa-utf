// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { TagsResponse } from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';

export async function getFullListOfTags() {
	try {
		return await pb.collection('tags').getFullList<TagsResponse>({
			skipTotal: true,
			batch: 1000,
			sort: '+category,+name',
		});
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getTagByFilter(name: string, category: string) {
	return pb
		.collection('tags')
		.getFirstListItem<TagsResponse>(
			`name='${name}'&&category='${category}'`
		);
}
