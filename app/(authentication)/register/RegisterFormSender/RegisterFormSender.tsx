// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, ReactNode, useState } from 'react';
import Box from '@mui/material/Box/Box';
import { loginWithPassword, registerUser } from '@/lib/apiHelpers/authAPI';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { checkValidUsername } from '@/lib/usernameHelper';
interface RegisterFormSenderProps {
	children: ReactNode;
}

const RegisterFormSender: FunctionComponent<RegisterFormSenderProps> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const router = useRouter();

	const handleRegisterError = (toastId: number | string, error: any) => {
		console.error(error.message);
		console.error(error.response);
		if (error.response.data) {
			console.error(error.response.data);
			console.log(JSON.stringify(error.response.data));
			if (
				error.response.data.username !== undefined &&
				error.response.data.username.code ===
					'validation_invalid_username'
			) {
				toast.update(toastId, {
					render: `Nome de usuário inválido. Tente outro.`,
					type: 'error',
					isLoading: false,
					autoClose: 5000,
					pauseOnFocusLoss: true,
					draggable: true,
					pauseOnHover: true,
					closeOnClick: true,
				});
				return;
			}

			if (
				error.response.data.email !== undefined &&
				error.response.data.email.code === 'validation_invalid_email'
			) {
				toast.update(toastId, {
					render: `Email inválido. Tente outro.`,
					type: 'error',
					isLoading: false,
					autoClose: 5000,
					pauseOnFocusLoss: true,
					draggable: true,
					pauseOnHover: true,
					closeOnClick: true,
				});
				return;
			}
		}

		toast.update(toastId, {
			render: `Não foi possível fazer seu registro, algo deu errado.`,
			type: 'error',
			isLoading: false,
			autoClose: 5000,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			closeOnClick: true,
		});
	};

	const handleRegisterSuccess = async (
		toastId: number | string,
		username: string,
		password: string
	) => {
		toast.update(toastId, {
			render: `Registrado com sucesso. Fazendo login...`,
			type: 'success',
			isLoading: false,
			autoClose: 5000,
			pauseOnFocusLoss: true,
			draggable: true,
			pauseOnHover: true,
			closeOnClick: true,
		});

		const loginToastId = toast.loading('Fazendo login...');

		loginWithPassword(username, password)
			.then(() => {
				toast.update(loginToastId, {
					render: `Logado com sucesso.`,
					type: 'success',
					isLoading: false,
					autoClose: 5000,
					pauseOnFocusLoss: true,
					draggable: true,
					pauseOnHover: true,
					closeOnClick: true,
				});
				router.push('/');
			})
			.catch((error) => {
				console.error(error);
				toast.update(loginToastId, {
					render: `Falha ao fazer login.`,
					type: 'error',
					isLoading: false,
					autoClose: 5000,
					pauseOnFocusLoss: true,
					draggable: true,
					pauseOnHover: true,
					closeOnClick: true,
				});
			});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: FormData = new FormData(event.currentTarget);
		const submitUsername = data.get('username')?.toString();
		const submitName = data.get('name')?.toString();
		const submitEmail = data.get('email')?.toString();
		const submitPassword = data.get('password')?.toString();
		const submitPasswordConfirm = data.get('password-confirm')?.toString();

		if (
			submitUsername === undefined ||
			submitEmail === undefined ||
			submitPassword === undefined ||
			submitPasswordConfirm === undefined ||
			submitName === undefined
		) {
			toast.error('Preencha todos os campos.');
			return;
		}

		const isValidUsername = checkValidUsername(submitUsername);

		if (!isValidUsername.valid) {
			toast.error(isValidUsername.reason);
			return;
		}

		// Check for email format
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitEmail)) {
			toast.error('Email inválido.');
			return;
		}

		// Check for password length
		if (submitPassword.length < 6) {
			toast.error('A senha deve ter no mínimo 6 caracteres.');
			return;
		}

		// Check if passwords match
		if (submitPassword !== submitPasswordConfirm) {
			toast.error('As senhas não coincidem.');
			return;
		}

		const id = toast.loading('Fazendo cadastro...');

		try {
			const res = await registerUser(
				submitUsername,
				submitEmail,
				submitPassword,
				submitPasswordConfirm,
				submitName
			);
			console.log(res);

			handleRegisterSuccess(id, submitUsername, submitPassword);
		} catch (error) {
			handleRegisterError(id, error);
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

			<Stack direction="column" spacing={0.5} sx={{ my: 2 }}>
				<LoadingButton
					type="submit"
					fullWidth
					variant="contained"
					loading={isLoading}
				>
					Registrar
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

export default RegisterFormSender;
