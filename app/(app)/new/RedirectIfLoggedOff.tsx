// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import usePbAuth from '@/hooks/usePbAuth';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useEffect } from 'react';

interface RedirectIfLoggedOffProps {}

const RedirectIfLoggedOff: FunctionComponent<RedirectIfLoggedOffProps> = () => {
	const [_, user] = usePbAuth();
	const router = useRouter();

	useEffect(() => {
		if (user === null) router.replace('/login-required?r=/new');
	}, [router, user]);

	return <></>;
};

export default RedirectIfLoggedOff;
