// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, ReactNode } from 'react';
import Box from '@mui/material/Box/Box';
import { loginWithPassword } from '@/lib/apiHelpers/authAPI';
import { toast } from 'react-toastify';
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
		const submitLogin = data.get('login')?.toString();
		const submitPassword = data.get('password')?.toString();
		const submitRemember = data.get('remember')?.toString();
		if (submitLogin === undefined) return;

		if (submitPassword === undefined) return;

		if (submitRemember) {
			//setPersistence(auth, browserSessionPersistence);
		}
		try {
			await loginWithPassword(submitLogin, submitPassword);
			toast.success('Login com sucesso!');
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				switch (error.message) {
					case 'Failed to authenticate.':
						toast.error('Falha na autenticação');
						break;

					default:
						toast.error(error.message);
						break;
				}
			}
		}
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
			{children}
		</Box>
	);
};

export default LoginFormSender;
