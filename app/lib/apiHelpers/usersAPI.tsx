// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { UsersStatsResponse } from '@/types/pocketbase-types';
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
