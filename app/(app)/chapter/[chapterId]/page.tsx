// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Typography from '@mui/material/Typography/Typography';
import { FunctionComponent } from 'react';

interface PageProps {}

const Page: FunctionComponent<PageProps> = () => {
	return (
		<Typography variant="h5" fontWeight={500} pt={10}>
			Nenhum post selecionado.
		</Typography>
	);
};

export default Page;
