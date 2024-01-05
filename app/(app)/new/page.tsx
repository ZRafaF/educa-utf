// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import Container from '@mui/material/Container/Container';
import Typography from '@mui/material/Typography/Typography';

import { Metadata } from 'next/types';
import EditMetadata from '@/components/EditMetadata/EditMetadata';
import TypeSelector from './TypeSelector';
export const metadata: Metadata = {
	title: 'Criar novo - EducaUTF',
	description: 'Crie um novo artigo ou capítulo e publique no EducaUTF!',
	keywords: [
		'EducaUTF',
		'Educa UTF',
		'novo artigo',
		'criar',
		'novo',
		'novo capítulo',
	],
};

export default function Page() {
	return (
		<Container maxWidth={'lg'} sx={{ py: 4, flexGrow: 1 }}>
			<Typography component="h1" variant="h4" align="center" pb={2}>
				Criar novo <TypeSelector />
			</Typography>

			<EditMetadata />
		</Container>
	);
}
