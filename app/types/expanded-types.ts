// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	ArticlesResponse,
	KeyWordsResponse,
	TagsResponse,
} from './pocketbase-types';

export type ArticlesExpand = {
	tag: TagsResponse;
	key_words: KeyWordsResponse[];
};

export type ChaptersExpand = {
	articles: ArticlesResponse[];
	tag: TagsResponse;
	key_words: KeyWordsResponse[];
};

export type ChaptersExpandTags = {
	tag: TagsResponse;
	key_words: KeyWordsResponse[];
};
