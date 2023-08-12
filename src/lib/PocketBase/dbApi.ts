// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostsResponse } from "@/types/pocketbase-types";
import pb from "./pocketbase";

export async function getListOfPosts() {
	return pb.collection("posts").getFullList<PostsResponse>();
}

export async function getPostById(id: string) {
	return pb.collection("posts").getOne(id);
}
