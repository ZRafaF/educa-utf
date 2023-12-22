// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { KeyWordsResponse } from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';

export async function getKeyWordListBySimilar(input: string) {
	return pb.collection('key_words').getFullList<KeyWordsResponse>({
		filter: `word~'${input}'`,
	});
}

export async function getKeyWord(word: string) {
	return pb
		.collection('key_words')
		.getFirstListItem<KeyWordsResponse>(`word='${word}'`);
}

export async function getKeyWordById(id: string) {
	return pb
		.collection('key_words')
		.getFirstListItem<KeyWordsResponse>(`id='${id}'`);
}

export async function createKeyWord(word: string, userId: string) {
	const data = {
		word: word,
		user: userId,
	};

	const record = await pb
		.collection('key_words')
		.create<KeyWordsResponse>(data);
	return record;
}
