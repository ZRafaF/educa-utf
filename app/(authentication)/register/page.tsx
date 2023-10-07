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
				my: 8,
				mx: 4,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Typography component="h1" variant="h5" width={'100%'}>
				Fazer Registro
			</Typography>

			<Grid container>
				<Grid item>
					<Link href="/login" style={{ color: 'inherit' }}>
						{'Já tem uma conta? Login aqui!'}
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
};

export default page;
