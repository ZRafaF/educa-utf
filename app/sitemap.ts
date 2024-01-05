// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { getFullListOfArticles } from './lib/apiHelpers/articlesAPI';
import { getFullListOfChapters } from './lib/apiHelpers/chaptersAPI';
import { getListOfUsersStats } from './lib/apiHelpers/usersAPI';

export default async function sitemap() {
	const articles = await getFullListOfArticles();

	const articlesSiteMap = articles.map((article) => ({
		url: `https://educautf.td.utfpr.edu.br/article/${article.id}`,
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 0.9,
	}));

	const chapters = await getFullListOfChapters();

	let chaptersSiteMap: {
		url: string;
		lastModified: Date;
		changeFrequency: string;
		priority: number;
	}[] = [];

	chapters.forEach((chapter) => {
		chapter.expand?.articles.forEach((article) => {
			chaptersSiteMap.push({
				url: `https://educautf.td.utfpr.edu.br/chapter/${chapter.id}/${article.id}`,
				lastModified: new Date(),
				changeFrequency: 'daily',
				priority: 0.9,
			});
		});
	});

	const users = await getListOfUsersStats();
	const usersSiteMap = users.map((user) => ({
		url: `https://educautf.td.utfpr.edu.br/profile/${user.username}`,
		lastModified: new Date(),
		changeFrequency: 'daily',
		priority: 0.7,
	}));

	return [
		{
			url: 'https://educautf.td.utfpr.edu.br/',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		...articlesSiteMap,
		...chaptersSiteMap,
		...usersSiteMap,
		{
			url: 'https://educautf.td.utfpr.edu.br/browse/articles',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: 'https://educautf.td.utfpr.edu.br/browse/chapters',
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.6,
		},
		{
			url: 'https://educautf.td.utfpr.edu.br/login',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: 'https://educautf.td.utfpr.edu.br/register',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.5,
		},
		{
			url: 'https://educautf.td.utfpr.edu.br/terms',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.2,
		},
		{
			url: 'https://educautf.td.utfpr.edu.br/privacy',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.2,
		},
		{
			url: 'https://educautf.td.utfpr.edu.br/new',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.2,
		},
	];
}
