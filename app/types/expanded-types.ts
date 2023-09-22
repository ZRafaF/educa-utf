// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ArticlesResponse, TagsResponse } from './pocketbase-types';

export type ArticlesExpand = {
	tags: TagsResponse[];
};

export type ChaptersExpand = {
	articles: ArticlesResponse[];
	tags: TagsResponse[];
};

export type ChaptersExpandTags = {
	tags: TagsResponse[];
};
