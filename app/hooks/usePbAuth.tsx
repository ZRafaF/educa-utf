// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import pb from '@/lib/PocketBase/pocketbase';
import { UsersResponse } from '@/types/pocketbase-types';
import { useEffect, useState } from 'react';

const usePbAuth = () => {
	const [token, setToken] = useState(pb.authStore.token);
	const [user, setUser] = useState<UsersResponse | null>(
		pb.authStore.model as UsersResponse
	);

	useEffect(() => {
		pb.collection('users').authRefresh();

		return pb.authStore.onChange((token, model) => {
			setToken(token);
			setUser(model as UsersResponse);
		});
	}, []);

	return [token, user] as const;
};

export default usePbAuth;
