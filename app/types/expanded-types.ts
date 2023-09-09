// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostsResponse, TagsResponse } from './pocketbase-types';

export type PostsExpand = {
	tags: TagsResponse[];
};

export type ChaptersExpand = {
	posts: PostsResponse[];
	tags: TagsResponse[];
};

export type ChaptersExpandTags = {
	tags: TagsResponse[];
};
