// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Box from '@mui/material/Box/Box';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';

import LoginFormSender from './LoginFormSender/LoginFormSender';
import LoginFormContent from './LoginFormContent/LoginFormContent';
import Link from 'next/link';
import Container from '@mui/material/Container/Container';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
	title: 'Login - EducaUTF',
	description: 'Faça login em sua conta do EducaUTF',
	keywords: ['EducaUTF', 'Educa UTF', 'login', 'logar', 'entrar'],
};

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
	return (
		<Box
			sx={{
				mb: 4,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Container maxWidth="sm">
				<Typography component="h1" variant="h5" width={'100%'}>
					Fazer Login
				</Typography>
				<LoginFormSender>
					<LoginFormContent />
				</LoginFormSender>
				<Grid container>
					<Grid item xs>
						<Link href="#" style={{ color: 'inherit' }}>
							<Typography sx={{ fontSize: 14 }}>
								Esqueci minha senha
							</Typography>
						</Link>
					</Grid>
					<Grid item>
						<Link href="/register" style={{ color: 'inherit' }}>
							<Typography sx={{ fontSize: 14 }}>
								Registre-se aqui!
							</Typography>
						</Link>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export default LoginPage;
