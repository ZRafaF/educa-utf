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
