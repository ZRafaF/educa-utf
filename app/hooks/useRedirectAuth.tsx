// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use-client';

import { useEffect } from 'react';
import usePbAuth from './usePbAuth';
import { redirect } from 'next/navigation';

const useRedirectAuth = (shouldRedirectIfLoggedOut?: boolean) => {
	const [, user] = usePbAuth();

	useEffect(() => {
		if (user) {
			redirect(`/profile/${user.username}`);
		}
		if (shouldRedirectIfLoggedOut && user === null) redirect('/');
	}, [user]);
};

export default useRedirectAuth;
