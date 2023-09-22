// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Collections, ArticlesResponse } from '@/types/pocketbase-types';

export function formatString(input: string): string {
	const sanitized = input
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9\-]/g, '')
		.toLowerCase();
	return sanitized;
}

export async function waitSeconds(time: number = 1) {
	await fetch(`https://hub.dummyapis.com/delay?seconds=${time}`);
}

export const defaultPostResponse: ArticlesResponse = {
	created: '123',
	title: 'string',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt scelerisque sagittis. Vivamus ultrices odio vel risus rhoncus eleifend sit amet ut magna. Cras sed enim lectus. Suspendisse',
	user: '123',
	id: 'RecordIdString',
	visible: true,
	views: 0,
	document: 'string',
	tags: [],
	updated: 'IsoDateString',
	collectionId: 'string',
	cover: 'string',
	collectionName: Collections.Articles,
};

export const getRandomImageUrl = () => {
	return `https://picsum.photos/seed/${Math.random()}/500/300`;
};

export function splitStringByComma(inputString: string): string[] {
	// Split the input string by commas and trim whitespace from each word
	const words = inputString.split(',').map((word) => word.trim());
	return words;
}
