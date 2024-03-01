// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
	UsersRecord,
	UsersResponse,
	UsersStatsResponse,
} from '@/types/pocketbase-types';
import pb from '../PocketBase/pocketbase';

export async function getListOfUsersStats() {
	try {
		return await pb
			.collection('users_stats')
			.getFullList<UsersStatsResponse>({
				skipTotal: true,
			});
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getUsersStatsByUsername(username: string) {
	return pb
		.collection('users_stats')
		.getFirstListItem<UsersStatsResponse>(`username = "${username}"`, {
			skipTotal: true,
		});
}

export async function getUsersStatsById(userId: string) {
	return pb.collection('users_stats').getOne<UsersStatsResponse>(userId);
}

export async function updateUserAvatar(id: string, newAvatar: File | null) {
	return await pb.collection('users').update<UsersResponse>(id, {
		avatar: newAvatar,
	});
}

export async function updateUser(id: string, user: UsersRecord) {
	return await pb.collection('users').update<UsersResponse>(id, user);
}

export function getUserAvatarUrl(user: UsersResponse | UsersStatsResponse) {
	const record = {
		id: user.id,
		collectionId: user.collectionId,
		collectionName: user.collectionName,
	};
	return pb.files.getUrl(record, user.avatar, { thumb: '100x100' });
}

export async function getUserAvatarUrlByUserId(userId: string) {
	const record = await pb.collection('users_stats').getOne(userId);

	return pb.files.getUrl(record, record.avatar, { thumb: '100x100' });
}

export async function updateLikedArticles(
	userId: string,
	articleId: string,
	action: 'add' | 'remove'
) {
	const updateFunc = action === 'add' ? 'liked_articles+' : 'liked_articles-';

	return pb.collection('users').update<UsersStatsResponse>(userId, {
		[updateFunc]: articleId,
	});
}

export async function deleteUser(id: string) {
	return await pb.collection('users').delete(id);
}
