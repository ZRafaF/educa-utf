// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from '@mui/material/Container/Container';
import Typography from '@mui/material/Typography/Typography';
import { FunctionComponent } from 'react';

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return (
		<Container maxWidth={'md'}>
			<Typography variant="h5" fontWeight={500} pt={10}>
				Nenhum post selecionado
			</Typography>
		</Container>
	);
};

export default Page;
