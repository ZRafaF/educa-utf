// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { useEffect } from 'react';
import usePbAuth from './usePbAuth';
import { useRouter } from 'next/navigation';

const useRedirectAuth = (shouldRedirectIfLoggedOut?: boolean) => {
	const [, user] = usePbAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.back();
		}
		if (shouldRedirectIfLoggedOut && user === null) router.back();
	}, [user, shouldRedirectIfLoggedOut, router]);
};

export default useRedirectAuth;
