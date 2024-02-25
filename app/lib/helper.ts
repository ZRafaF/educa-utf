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

export const MIN_TOOLBAR_HEIGHT = '56px';
export const MIN_FOOTER_HEIGHT = '200px';
export const MIN_PAGINATION_HEIGHT = '64px';

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

export const getRandomImageUrl = () => {
	return `https://picsum.photos/seed/${Math.random()}/400/200`;
};

export function splitStringByComma(inputString: string): string[] {
	// Split the input string by commas and trim whitespace from each word
	const words = inputString.split(',').map((word) => word.trim());
	return words;
}

export function stringToColor(string: string | undefined) {
	let hash = 0;
	let i;
	if (!string) return '#ff0000';
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

export function getInitials(name: string | undefined) {
	if (!name) return 'NL';
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

export function isUTFPRUser(username: string): boolean {
	// Checks if follows the Pattern: 'a' followed by numbers
	const regex = /^a\d+$/;

	return true;
}

export function countSubstrings(mainString: string, substring: string) {
	const count = mainString.split(substring).length - 1;
	return count;
}

export function sleep(duration: number): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, duration);
	});
}

export function formatNumber(num: number, decimalPlaces: number = 1): string {
	if (num >= 1000 && num < 1000000) {
		return (num / 1000).toFixed(decimalPlaces) + 'k';
	} else if (num >= 1000000) {
		return (num / 1000000).toFixed(decimalPlaces) + 'M';
	} else {
		return num.toString();
	}
}

export function isNullOrUndefined(value: any) {
	return value === undefined || value === null;
}

export function compareStrings(a: string, b: string) {
	// Compares two strings, removes accents, spaces and converts to lowercase

	const regex = /[^a-zA-Z0-9]/g;
	const stringA = a.normalize('NFD').replace(regex, '').toLowerCase();
	const stringB = b.normalize('NFD').replace(regex, '').toLowerCase();
	return stringA === stringB;
}

export function extractChapterId(input: string): string | false {
	const urlRegex = /^https?:\/\/[^\/]+\/chapter\/([^\/?#]+)/;
	const match = input.match(urlRegex);

	if (match && match[1]) {
		return match[1];
	} else {
		return false;
	}
}

export function extractArticleId(input: string): string | false {
	const chapterRegex = /\/chapter\/[^\/]+\/([^\/?]+)/;
	const articleRegex = /\/article\/([^\/?]+)/;

	const chapterMatch = input.match(chapterRegex);
	const articleMatch = input.match(articleRegex);

	if (chapterMatch && chapterMatch[1]) {
		if (chapterMatch[1] === 'edit') return false;

		return chapterMatch[1];
	} else if (articleMatch && articleMatch[1]) {
		return articleMatch[1];
	} else {
		return false;
	}
}

export function isValidUrl(input: string): boolean {
	try {
		new URL(input);
		return true;
	} catch (error) {
		return false;
	}
}

export function slugify(str: string) {
	return String(str)
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
		.trim() // trim leading or trailing whitespace
		.toLowerCase() // convert to lowercase
		.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
		.replace(/\s+/g, '-') // replace spaces with hyphens
		.replace(/-+/g, '-'); // remove consecutive hyphens
}

export function basicSlugify(str: string) {
	return String(str)
		.normalize('NFKD') // split accented characters into their base characters and diacritical marks
		.toLowerCase(); // convert to lowercase
}
