// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, ReactNode } from 'react';
import Box from '@mui/material/Box/Box';
import { loginWithPassword } from '@/lib/apiHelpers/authAPI';
import useRedirectAuth from '@/hooks/useRedirectAuth';

interface LoginFormSenderProps {
	children: ReactNode;
}

const LoginFormSender: FunctionComponent<LoginFormSenderProps> = ({
	children,
}) => {
	useRedirectAuth();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitEmail = data.get('email')?.toString();
		const submitPassword = data.get('password')?.toString();
		const submitRemember = data.get('remember')?.toString();
		if (submitEmail === undefined) return;

		if (submitPassword === undefined) return;

		if (submitRemember) {
			//setPersistence(auth, browserSessionPersistence);
		}

		const authRes = await loginWithPassword(submitEmail, submitPassword);

		console.log(authRes);
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
			{children}
		</Box>
	);
};

export default LoginFormSender;
