// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	Collections,
	ArticlesResponse,
	ArticlesVisibilityOptions,
	ArticlesStatsVisibilityOptions,
	ChaptersStatsVisibilityOptions,
	ChaptersVisibilityOptions,
} from '@/types/pocketbase-types';
import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO } from 'date-fns';

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
	visibility: ArticlesVisibilityOptions.public,
	views: 0,
	document: 'string',
	tags: [],
	updated: 'IsoDateString',
	collectionId: 'string',
	cover: 'string',
	attachments: '123',
	collectionName: Collections.Articles,
};

export const getRandomImageUrl = () => {
	return `https://picsum.photos/seed/${Math.random()}/400/200`;
};

export function splitStringByComma(inputString: string): string[] {
	// Split the input string by commas and trim whitespace from each word
	const words = inputString.split(',').map((word) => word.trim());
	return words;
}

export function stringToColor(string: string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}

export function getInitials(name: string) {
	const numberOfNames = name.split(' ').length;
	if (numberOfNames > 1)
		return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase();
	return `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`.toUpperCase();
}

export function getFormData(object: any) {
	const formData = new FormData();
	Object.keys(object).forEach((key) => formData.append(key, object[key]));
	return formData;
}

export function getFormattedDate(
	date: string,
	formatStyle: string = 'dd/MM/yyyy'
) {
	const parsedDate = parseISO(date);

	return format(parsedDate, formatStyle, {
		locale: ptBR,
	});
}

export function getFormattedVisibility(
	visibility:
		| ArticlesStatsVisibilityOptions
		| ArticlesVisibilityOptions
		| ChaptersStatsVisibilityOptions
		| ChaptersVisibilityOptions
) {
	return visibility === 'public' ? 'Publico' : 'Privado';
}
