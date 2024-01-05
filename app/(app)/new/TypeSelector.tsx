// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import Button from '@mui/material/Button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FunctionComponent } from 'react';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Tooltip from '@mui/material/Tooltip';

interface TypeSelectorProps {}

const TypeSelector: FunctionComponent<TypeSelectorProps> = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const type = searchParams.get('type') ?? 'article';
	const localizedName = type === 'article' ? 'Artigo' : 'Capítulo';

	const handleChangeItems = () => {
		const params = new URLSearchParams(searchParams);
		params.set('type', `${type === 'article' ? 'chapter' : 'article'}`);

		router.push(pathname + '?' + params);
	};

	return (
		<Tooltip title="Trocar tipo de conteúdo" arrow>
			<Button
				sx={{
					textTransform: 'inherit',
					px: 1,
					fontSize: 26,
				}}
				variant="outlined"
				onClick={() => {
					handleChangeItems();
				}}
			>
				{localizedName} <SwapVertIcon fontSize="inherit" />
			</Button>
		</Tooltip>
	);
};

export default TypeSelector;
