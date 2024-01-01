// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { usePathname } from 'next/navigation';

interface BrowseTitleProps {}

const BrowseTitle: FunctionComponent<BrowseTitleProps> = () => {
	const pathname = usePathname();

	const currentRoute = pathname.split('/').pop();

	switch (currentRoute) {
		case 'articles':
			return (
				<Typography fontWeight={'bold'} variant="h4">
					Buscando por artigos
				</Typography>
			);
		case 'chapters':
			return (
				<Typography fontWeight={'bold'} variant="h4">
					Buscando por capítulos
				</Typography>
			);
		default:
			return (
				<Typography fontWeight={'bold'} variant="h4">
					Buscando por conteúdos
				</Typography>
			);
	}
};

export default BrowseTitle;
