// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, ReactNode, useState } from 'react';
import Box from '@mui/material/Box/Box';
import { loginUTFPR, loginWithPassword } from '@/lib/apiHelpers/authAPI';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
interface LoginFormSenderProps {
	children: ReactNode;
}

const LoginFormSender: FunctionComponent<LoginFormSenderProps> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	const handleLoginError = (
		toastId: number | string,
		toastType: 'error' | 'warning',
		error: unknown
	) => {
		if (error instanceof Error) {
			console.error(error);

			switch (error.message) {
				case 'Failed to authenticate.':
					toast.update(toastId, {
						render: `Falha na autenticação.`,
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
						render: `Falha no servidor da UTFPR, tente novamente mais tarde.`,
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
						render: `Usuário ou senha inválido.`,
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
						render: `${error.message}.`,
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
				render: `Não foi possível fazer login.`,
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

	const handleLoginSuccess = (toastId: number | string) => {
		toast.update(toastId, {
			render: `Login com sucesso. Bem vindo!`,
			type: 'success',
			isLoading: false,
			autoClose: 5000,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			closeOnClick: true,
		});
		router.push('/');
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
		const id = toast.loading('Fazendo login...');

		const parallelLogin = () => {
			const educaUTFLogin = loginWithPassword(
				submitLogin,
				submitPassword
			);
			const UTFPRLogin = loginUTFPR(submitLogin, submitPassword);

			return Promise.allSettled([educaUTFLogin, UTFPRLogin]);
		};

		const res = await parallelLogin();

		if (res[0].status === 'fulfilled' || res[1].status === 'fulfilled') {
			return handleLoginSuccess(id);
		}
		handleLoginError(id, 'error', res[0].reason);
		handleLoginError(id, 'error', res[1].reason);
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

			<Stack direction="column" spacing={0.5} sx={{ my: 2 }}>
				<LoadingButton
					type="submit"
					fullWidth
					variant="contained"
					loading={isLoading}
				>
					Login
				</LoadingButton>
				<Typography variant="body2" fontSize={13}>
					Ao continuar você declara que leu e concordou com os{' '}
					<Link
						href="/terms"
						component={NextLink}
						underline="hover"
						alignItems="center"
						target="_blank"
					>
						Termos de Serviço
					</Link>
					{' e '}
					<Link
						href="/privacy"
						component={NextLink}
						underline="hover"
						alignItems="center"
						target="_blank"
					>
						Política de Privacidade
					</Link>
				</Typography>
			</Stack>
		</Box>
	);
};

export default LoginFormSender;
