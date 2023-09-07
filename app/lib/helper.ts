// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Collections, PostsResponse } from "@/types/pocketbase-types";

export function formatString(input: string): string {
	const sanitized = input
		.replace(/\s+/g, "-")
		.replace(/[^a-z0-9\-]/g, "")
		.toLowerCase();
	return sanitized;
}

export async function waitSeconds(time: number = 1) {
	await fetch(`https://hub.dummyapis.com/delay?seconds=${time}`);
}

export const defaultPostResponse: PostsResponse = {
	created: "123",
	title: "string",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt scelerisque sagittis. Vivamus ultrices odio vel risus rhoncus eleifend sit amet ut magna. Cras sed enim lectus. Suspendisse",
	slug: "string",
	user: "123",
	id: "RecordIdString",
	rating: 2,
	visible: true,
	document: "string",
	liked_by: ["RecordIdString", "asd"],
	tags: "string",
	updated: "IsoDateString",
	collectionId: "string",
	cover: "string",
	collectionName: Collections.Posts,
};

export const bannerFaderSize = 0;
