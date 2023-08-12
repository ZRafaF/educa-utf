// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { PostsResponse } from "@/types/pocketbase-types";
import pb from "./PocketBase/pocketbase";

export default async function getPostList() {
	const res = await pb.collection("posts").getFullList<PostsResponse>();
}
