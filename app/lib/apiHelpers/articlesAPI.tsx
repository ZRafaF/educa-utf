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

export async function getListOfArticles() {
	try {
		return await pb.collection('articles').getFullList<ArticlesResponse>({
			skipTotal: true,
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
			expand: 'tags',
		});
}

export async function getArticleStatsById(articleId: string) {
	return pb
		.collection('articles_stats')
		.getOne<ArticlesStatsResponse>(articleId, {
			skipTotal: true,
		});
}

// export async function getPostsSorted(qnt: number, sortBy: string = '-created') {
// 	try {
// 		const response = await pb
// 			.collection('posts')
// 			.getList<ArticlesResponse<ArticlesExpand>>(1, qnt, {
// 				sort: sortBy,
// 				skipTotal: true,
// 			});
// 		return response.items;
// 	} catch (error) {
// 		console.error(error);
// 		return [];
// 	}
// }

export async function getBestArticlesOf(time: 'week' | 'month' | 'year') {
	try {
		return await pb
			.collection('articles')
			.getFullList<ArticlesResponse<ArticlesExpand>>({
				skipTotal: true,
				expand: 'tags',
			});
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getNewArticles() {
	try {
		const response = await pb
			.collection('articles')
			.getList<ArticlesResponse<ArticlesExpand>>(1, 8, {
				sort: '-created',
				skipTotal: true,
				expand: 'tags',
			});
		return response.items;
	} catch (error) {
		console.error(error);
		return [];
	}
}
export async function getArticleDocumentUrl(article: ArticlesResponse) {
	const record = {
		id: article.id,
		collectionId: article.collectionId,
		collectionName: article.collectionName,
	};

	const documentUrl = pb.files.getUrl(record, article.document, {});

	try {
		return await fetch(documentUrl).then((response) => response.text());
	} catch (error) {
		return 'Não foi possível encontrar esse post :(';
	}
}

export async function createArticle(
	newArticle: ArticlesRecord,
	coverFile: File | undefined
) {
	const form = getFormData(newArticle);
	if (coverFile) form.append('cover', coverFile);

	return pb.collection('articles').create<ArticlesResponse>(form);
}
