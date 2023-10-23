// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { useEffect, useCallback } from 'react'; // Add useCallback import
import usePbAuth from './usePbAuth';
import { useRouter } from 'next/navigation';

const useRedirectAuth = (shouldRedirectIfLoggedOut?: boolean) => {
	const [, user] = usePbAuth();
	const router = useRouter();

	// Wrap triggerRoute in useCallback
	const triggerRoute = useCallback(() => {
		if (user) {
			router.back();
		}
		if (shouldRedirectIfLoggedOut && user === null) router.back();
	}, [user, shouldRedirectIfLoggedOut, router]);

	useEffect(() => {
		triggerRoute();
	}, [user, shouldRedirectIfLoggedOut, router, triggerRoute]);

	return [triggerRoute] as const;
};

export default useRedirectAuth;
