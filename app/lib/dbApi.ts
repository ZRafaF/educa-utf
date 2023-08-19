// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	ChaptersResponse,
	PostsRecord,
	PostsResponse,
} from "@/types/pocketbase-types";
import pb from "./PocketBase/pocketbase";
import { formatString } from "./helper";

export function getListOfPosts() {
	return pb.collection("posts").getFullList<PostsResponse>();
}

export function getPostById(id: string) {
	return pb.collection("posts").getOne<PostsResponse>(id);
}

export async function getListOfChapters() {
	return pb.collection("chapters").getFullList<ChaptersResponse>();
}

export function getChapterById(id: string, expand: boolean = false) {
	return pb
		.collection("chapters")
		.getOne(id, expand ? { expand: "posts" } : {});
}

function createPost(newPost: PostsRecord) {
	newPost.slug = formatString(newPost.title);
	return pb.collection("posts").create(newPost);
}

export function getUser() {
	return pb.authStore;
}

export function isLoggedIn() {
	return pb.authStore.isValid;
}
