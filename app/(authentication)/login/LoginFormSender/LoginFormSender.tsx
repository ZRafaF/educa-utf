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
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
interface LoginFormSenderProps {
	children: ReactNode;
}

const LoginFormSender: FunctionComponent<LoginFormSenderProps> = ({
	children,
}) => {
	useRedirectAuth();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLoginError = (
		toastId: number | string,
		authProvider: string,
		toastType: 'error' | 'warning',
		error: unknown
	) => {
		if (error instanceof Error) {
			console.error(error);

			switch (error.message) {
				case 'Failed to authenticate.':
					toast.update(toastId, {
						render: `Autenticação pela ${authProvider}: Falha na autenticação.`,
						type: toastType,
						isLoading: false,
						autoClose: 5000,
						pauseOnFocusLoss: true,
						draggable: true,
						pauseOnHover: true,
						closeOnClick: true,
					});
					break;
				case "UTFPR's API is not working properly.":
					toast.update(toastId, {
						render: `Autenticação pela ${authProvider}: Falha no servidor da UTFPR, tente novamente mais tarde.`,
						type: toastType,
						isLoading: false,
						autoClose: 5000,
						pauseOnFocusLoss: true,
						draggable: true,
						pauseOnHover: true,
						closeOnClick: true,
					});
					break;
				case 'Invalid user or password.':
					toast.update(toastId, {
						render: `Autenticação pela ${authProvider}: Usuário ou senha inválido.`,
						type: toastType,
						isLoading: false,
						autoClose: 5000,
						pauseOnFocusLoss: true,
						draggable: true,
						pauseOnHover: true,
						closeOnClick: true,
					});
					break;
				default:
					toast.update(toastId, {
						render: `Autenticação pela ${authProvider}: ${error.message}.`,
						type: toastType,
						isLoading: false,
						autoClose: 5000,
						pauseOnFocusLoss: true,
						draggable: true,
						pauseOnHover: true,
						closeOnClick: true,
					});
					break;
			}
		} else {
			toast.update(toastId, {
				render: `Não foi possível fazer login com o ${authProvider}.`,
				type: 'error',
				isLoading: false,
				autoClose: 5000,
				pauseOnFocusLoss: true,
				draggable: true,
				pauseOnHover: true,
				closeOnClick: true,
			});
		}
	};

	const handleLoginSuccess = (
		toastId: number | string,
		authProvider: string
	) => {
		toast.update(toastId, {
			render: `Login com ${authProvider} com sucesso. Bem vindo!`,
			type: 'success',
			isLoading: false,
			autoClose: 5000,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			closeOnClick: true,
		});
		// manualTrigger();
	};

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
		const id = toast.loading('Fazendo login com o EducaUTF...');

		try {
			await loginWithPassword(submitLogin, submitPassword);
			return handleLoginSuccess(id, 'EducaUTF');
		} catch (error) {
			handleLoginError(id, 'EducaUTF', 'warning', error);
		}

		const id2 = toast.loading('Fazendo login com a UTFPR...');

		try {
			await loginUTFPR(submitLogin, submitPassword);
			return handleLoginSuccess(id2, 'UTFPR');
		} catch (error) {
			handleLoginError(id2, 'UTFPR', 'error', error);
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
				>
					Login
				</LoadingButton>
			</Stack>
		</Box>
	);
};

export default LoginFormSender;
