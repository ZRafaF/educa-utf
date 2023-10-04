// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import Container from '@mui/material/Container/Container';
import Typography from '@mui/material/Typography/Typography';

import 'react-markdown-editor-lite/lib/index.css';
import { Metadata } from 'next/types';
import EditMetadata from '@/components/EditMetadata/EditMetadata';
import EditArticle from '@/components/EditArticle/EditArticle';

export const metadata: Metadata = {
	title: 'Novo artigo - EducaUTF',
	description: 'Crie um novo artigo e publique no EducaUTF!',
	keywords: ['EducaUTF', 'Educa UTF', 'novo artigo', 'criar', 'novo'],
};

export default function Page() {
	return (
		<Container maxWidth={'lg'} sx={{ py: 4, flexGrow: 1 }}>
			<Typography component="h1" variant="h4" align="center" gutterBottom>
				Criar novo artigo
			</Typography>

			<EditMetadata />

			<Typography variant="h6" gutterBottom>
				Artigo
			</Typography>

			<EditArticle />
		</Container>
	);
}
