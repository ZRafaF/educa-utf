// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use-client';

import { getUserAvatarUrl } from '@/lib/apiHelpers/usersAPI';
import { UsersResponse, UsersStatsResponse } from '@/types/pocketbase-types';
import { useEffect, useState } from 'react';

const useGetUserAvatar = (user: UsersResponse | UsersStatsResponse | null) => {
	const [avatarUrl, setAvatarUrl] = useState<string>('');

	useEffect(() => {
		if (user) {
			getUserAvatarUrl(user).then((url) => {
				setAvatarUrl(url);
			});
		}
	}, [user, setAvatarUrl]);

	return [avatarUrl] as const;
};

export default useGetUserAvatar;
