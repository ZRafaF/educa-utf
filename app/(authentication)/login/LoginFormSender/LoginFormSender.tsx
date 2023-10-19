// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, ReactNode, useState } from 'react';
import Box from '@mui/material/Box/Box';
import { loginUTFPR, loginWithPassword } from '@/lib/apiHelpers/authAPI';
import { toast } from 'react-toastify';
import useRedirectAuth from '@/hooks/useRedirectAuth';
import { isUTFPRUser } from '@/lib/helper';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation';

interface LoginFormSenderProps {
	children: ReactNode;
}

const LoginFormSender: FunctionComponent<LoginFormSenderProps> = ({
	children,
}) => {
	const [manualTrigger] = useRedirectAuth();

	const [isLoading, setIsLoading] = useState<boolean>(false);

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
			if (isUTFPRUser(submitLogin)) {
				await loginUTFPR(submitLogin, submitPassword);
			} else {
				await loginWithPassword(submitLogin, submitPassword);
			}
			toast.success('Login com sucesso!');
			manualTrigger();
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
		<Box
			component="form"
			onSubmit={(e) => {
				setIsLoading(true);
				handleSubmit(e).finally(() => {
					setIsLoading(false);
				});
			}}
			sx={{ mt: 1 }}
		>
			{children}
			<LoadingButton
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
				loading={isLoading}
			>
				Login
			</LoadingButton>
		</Box>
	);
};

export default LoginFormSender;
