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
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
interface LoginFormSenderProps {
	children: ReactNode;
}

const LoginFormSender: FunctionComponent<LoginFormSenderProps> = ({
	children,
}) => {
	const [manualTrigger] = useRedirectAuth();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [loginType, setLoginType] = useState<'normal' | 'utfpr'>('normal');

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
			if (loginType === 'normal') {
				await loginWithPassword(submitLogin, submitPassword);
				toast.success('Login com sucesso!');
				manualTrigger();
			} else {
				await loginUTFPR(submitLogin, submitPassword);
				toast.success('Login com sucesso!');
				manualTrigger();
			}
		} catch (error) {
			if (error instanceof Error) {
				console.error(error);
				switch (error.message) {
					case 'Failed to authenticate.':
						toast.error('Falha na autenticação.');
						break;
					case "UTFPR's API is not working properly.":
						toast.error(
							'Falha no servidor da UTFPR, tente novamente mais tarde.'
						);
						break;
					case 'Invalid user or password.':
						toast.error('Usuário ou senha inválido.');
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
			<Stack direction="row" spacing={4} sx={{ my: 2 }}>
				<LoadingButton
					type="submit"
					fullWidth
					variant="contained"
					loading={isLoading}
					onClick={() => setLoginType('normal')}
				>
					Login
				</LoadingButton>
				<LoadingButton
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					loading={isLoading}
					endIcon={<SchoolIcon />}
					onClick={() => setLoginType('utfpr')}
				>
					Login UTFPR
				</LoadingButton>
			</Stack>
		</Box>
	);
};

export default LoginFormSender;
