// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Box from '@mui/material/Box/Box';
import Grid from '@mui/material/Grid/Grid';
import Typography from '@mui/material/Typography/Typography';

import Link from 'next/link';
import { Metadata } from 'next/types';
import RegisterFormSender from './RegisterFormSender/RegisterFormSender';
import RegisterFormContent from './RegisterFormContent/RegisterFormContent';

export const metadata: Metadata = {
	title: 'Registro - EducaUTF',
	description: 'Registre-se em EducaUTF',
	keywords: ['EducaUTF', 'Educa UTF', 'register', 'registro', 'criar conta'],
};

interface pageProps {}

const page: FunctionComponent<pageProps> = () => {
	return (
		<Box
			sx={{
				mb: 4,
				mx: {
					xs: 1,
					sm: 2,
					md: 3,
					lg: 4,
				},
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Typography component="h1" variant="h5" width={'100%'}>
				Fazer Registro
			</Typography>
			<RegisterFormSender>
				<RegisterFormContent />
			</RegisterFormSender>
			<Grid container>
				<Grid item>
					<Link href="/login" style={{ color: 'inherit' }}>
						<Typography sx={{ fontSize: 14 }}>
							Já tem uma conta? Ou é aluno da UTFPR? Login aqui!
						</Typography>
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
};

export default page;
