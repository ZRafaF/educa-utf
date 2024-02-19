// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import Typography from '@mui/material/Typography';
import { FunctionComponent } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import SwapVertIcon from '@mui/icons-material/SwapVert';

interface BrowseTitleProps {}

const BrowseTitle: FunctionComponent<BrowseTitleProps> = () => {
	const pathname = usePathname();
	const router = useRouter();

	const currentRoute = pathname.split('/').pop();
	const localizedName = currentRoute === 'articles' ? 'Artigos' : 'Capítulos';

	return (
		<Typography fontWeight={'bold'} variant="h4">
			Buscar{' '}
			<Button
				sx={{
					textTransform: 'inherit',
					px: 1,
					fontWeight: 'inherit',
					fontSize: 26,
				}}
				variant="outlined"
				onClick={() => {
					router.push(
						`/browse/${
							currentRoute === 'articles'
								? 'chapters'
								: 'articles'
						}`
					);
				}}
			>
				{localizedName} <SwapVertIcon fontSize="inherit" />
			</Button>
		</Typography>
	);
};

export default BrowseTitle;
