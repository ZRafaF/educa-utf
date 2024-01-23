// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	ArticlesRecord,
	ArticlesResponse,
	ArticlesStatsResponse,
} from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';
import { ArticlesExpand } from '@/types/expanded-types';
import { getFormData } from '../helper';
import { ListResult, RecordOptions } from 'pocketbase';

export async function getFullListOfArticles() {
	try {
		return await pb.collection('articles').getFullList<ArticlesResponse>({
			skipTotal: true,
			batch: 9999,
		});
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getArticleById(id: string) {
	return pb
		.collection('articles')
		.getOne<ArticlesResponse<ArticlesExpand>>(id, {
			skipTotal: true,
			expand: 'tag, key_words',
		});
}

export async function getArticleStatsById(articleId: string) {
	return pb
		.collection('articles_stats')
		.getOne<ArticlesStatsResponse>(articleId, {
			skipTotal: true,
		});
}

export async function getBestArticlesOf(time: 'week' | 'month' | 'year') {
	try {
		const result = await pb
			.collection('articles_stats')
			.getList<ArticlesStatsResponse<ArticlesExpand>>(1, 15, {
				skipTotal: true,
				expand: 'tag, key_words',
			});
		return result.items;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export function getArticleDocumentUrl(
	article: ArticlesResponse | ArticlesStatsResponse
) {
	const record = {
		id: article.id,
		collectionId: article.collectionId,
		collectionName: article.collectionName,
	};

	return pb.files.getUrl(record, article.document);
}

export async function getArticleDocument(article: ArticlesResponse) {
	const documentUrl = getArticleDocumentUrl(article);

	try {
		if (documentUrl) {
			return await fetch(documentUrl).then((response) => response.text());
		}
	} catch (error) {
		console.error(error);
	}
	return undefined;
}

export async function createArticle(
	newArticle: ArticlesRecord,
	baseFile: Blob,
	keyWords: string[]
) {
	const form = getFormData(newArticle);
	form.append('document', baseFile, 'article.md');

	for (const word of keyWords) {
		form.append('key_words', word);
	}
	return await pb.collection('articles').create<ArticlesResponse>(form);
}

export async function getRandomArticle() {
	try {
		const list = await pb
			.collection('articles')
			.getList<ArticlesResponse>(1, 1, {
				filter: 'visibility = "public"',
				sort: '@random',
			});
		return list.items;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function updateArticle(
	articleId: string,
	updatedArticleRecord: ArticlesRecord,
	baseFile: Blob,
	keyWords: string[]
) {
	const form = getFormData(updatedArticleRecord);
	form.append('document', baseFile, 'article.md');
	for (const word of keyWords) {
		form.append('key_words', word);
	}
	return await pb
		.collection('articles')
		.update<ArticlesResponse>(articleId, form);
}

export async function getListOfArticlesStats(
	page: number,
	itemsPerPage: number,
	options: RecordOptions | undefined
) {
	try {
		return await pb
			.collection('articles_stats')
			.getList<ArticlesStatsResponse<ArticlesExpand>>(
				page,
				itemsPerPage,
				{
					...options,
					expand: 'tag, key_words',
				}
			);
	} catch (error) {
		console.error(error);
		return {} as ListResult<ArticlesStatsResponse<ArticlesExpand>>;
	}
}

export async function deleteArticle(articleId: string) {
	return await pb.collection('articles').delete(articleId);
}
