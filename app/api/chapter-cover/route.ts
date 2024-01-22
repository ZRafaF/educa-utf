// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { compareStrings } from '@/lib/helper';

const AVAILABLE_TAGS = [
	'Ciências Biológicas',
	'Ciências da Computação',
	'Ciências da Saúde',
	'Ciências Exatas',
	'Ciências Sociais',
	'Economia e Negócios',
	'Educação',
	'Engenharia',
	'Humanidades',
	'Linguagens e Comunicação',
	'Outro',
];

export async function GET(request: NextRequest) {
	const getRandomImage = Math.random() < 0.3;
	const tag = getRandomImage ? null : request.nextUrl.searchParams.get('tag');
	const defaultCoversPath = path.resolve('.', 'app/resources/defaultCovers');

	const randomCategoryTag =
		AVAILABLE_TAGS[Math.floor(Math.random() * AVAILABLE_TAGS.length)];
	let selectedTag = `/${randomCategoryTag}`;

	if (tag) {
		for (const tagName of AVAILABLE_TAGS) {
			if (compareStrings(tagName, tag)) {
				selectedTag = `/${tagName}`;
				break;
			}
		}
	}
	const coverCategoryPath = path.join(defaultCoversPath, `/${selectedTag}`);

	const availableImages = fs.readdirSync(coverCategoryPath);

	const randomImage =
		availableImages[Math.floor(Math.random() * availableImages.length)];

	const randomImagePath = path.join(coverCategoryPath, randomImage);
	const imageBuffer = fs.readFileSync(randomImagePath);

	return new Response(imageBuffer, {
		headers: { 'content-type': 'image/jpg' },
	});
}
