// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import SwapVertIcon from '@mui/icons-material/SwapVert';

interface SearchFieldProps {}

const SearchField: FunctionComponent<SearchFieldProps> = () => {
	const [searchInput, setSearchInput] = useState('');
	const pathname = usePathname();
	const paths = pathname.split('/');

	const router = useRouter();
	const [searchType, setSearchType] = useState<'Artigos' | 'Capítulos'>(
		'Artigos'
	);

	const disabled = paths.length > 1 && paths[1] === 'browse';
	// See if
	console.log(disabled);

	useEffect(() => {
		setSearchInput('');
	}, [pathname]);

	return (
		<Stack
			sx={{
				// backgroundColor: 'grey.A200',
				border: 'none',
				borderRadius: 1,
				overflow: 'hidden',
				opacity: disabled ? 0.3 : 1,
				pointerEvents: disabled ? 'none' : 'inherit',
			}}
			width={'100%'}
			maxWidth={600}
			direction={'column'}
			bgcolor={'grey.A200'}
			component={'form'}
			onSubmit={(e) => {
				e.preventDefault();
			}}
		>
			<Stack
				height={'2.5rem'}
				width={'100%'}
				direction={'row'}
				alignItems={'center'}
			>
				<Box
					component={'input'}
					type="search"
					placeholder="Buscar..."
					sx={{
						backgroundColor: 'transparent',
						border: 'none ',
						borderWidth: '1px',
						padding: '0 1rem',
						fontSize: '1rem',
						// Border radius only on left side
						borderTopLeftRadius: 5,
						borderBottomLeftRadius: 5,
						':focus': {
							outline: 'none',
						},
					}}
					width={'100%'}
					name="search"
					value={
						disabled
							? '[Desabilitado] Utilize a busca local'
							: searchInput
					}
					onChange={(e) => {
						setSearchInput(e.target.value);
					}}
				/>
				<Box color={'white'}>
					<Button
						sx={{
							textTransform: 'inherit',
							mx: 1,
							px: 1.5,
							// fontSize: 26,
							height: '2rem',
						}}
						color="inherit"
						variant="outlined"
						onClick={() => {
							setSearchType(
								searchType === 'Artigos'
									? 'Capítulos'
									: 'Artigos'
							);
						}}
					>
						{searchType} <SwapVertIcon fontSize="inherit" />
					</Button>
				</Box>
				<Box
					height={'100%'}
					display={'flex'}
					alignItems={'center'}
					px={1}
					component={'button'}
					border="none"
					sx={{
						':enabled': {
							':hover': {
								backgroundColor: 'rgba(0, 0, 0, 0.3)',
							},
							':active': {
								backgroundColor: 'rgba(0, 0, 0, 0.4)',
							},
						},
					}}
					onClick={() => {
						router.push(
							`/browse/${
								searchType === 'Artigos'
									? 'articles'
									: 'chapters'
							}?search=${searchInput}`
						);

						// window.location.assign(
						// 	`/browse/${
						// 		searchType === 'Artigos'
						// 			? 'articles'
						// 			: 'chapters'
						// 	}?search=${searchInput}`
						// );
					}}
					type="submit"
				>
					<SearchIcon />
				</Box>
			</Stack>
		</Stack>
	);
};

export default SearchField;
