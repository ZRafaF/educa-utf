// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useLoadingQuery from '@/hooks/useLoadingQuery';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

interface SearchInputComponentProps {}

const SearchInputComponent: FunctionComponent<
	SearchInputComponentProps
> = () => {
	const [searchInput, setSearchInput] = useState('');
	const searchParams = useSearchParams()!;
	const search = searchParams.get('search') ?? '';
	const pathname = usePathname();
	const [updateLoadingState] = useLoadingQuery();

	const router = useRouter();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);

			params.set(name, value);

			return decodeURIComponent(params.toString());
		},
		[searchParams, search]
	);

	const handleUpdate = (value: string) => {
		const newSearchParams = createQueryString('search', value);
		updateLoadingState(searchParams.toString(), newSearchParams);
		router.push(pathname + '?' + newSearchParams);
		// setSearchInput('');
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleUpdate(searchInput);
			}}
		>
			<Stack
				sx={{
					// backgroundColor: 'grey.A200',
					border: '1px solid',
					borderColor: 'var(--mui-palette-divider)',
					borderRadius: 2,
					overflow: 'hidden',
				}}
				width={'100%'}
				direction={'column'}
			>
				<Stack
					height={'2rem'}
					// width={'20rem'}
					width={'100%'}
					direction={'row'}
				>
					<Box
						component={'input'}
						type="search"
						placeholder="Pesquisar..."
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
						name="search-input"
						value={searchInput}
						onChange={(e) => {
							setSearchInput(e.target.value);
						}}
					/>
					<Box
						height={'100%'}
						display={'flex'}
						alignItems={'center'}
						px={1}
						component={'button'}
						bgcolor={'grey.A200'}
						border={'none'}
						type="submit"
						sx={{
							':hover': {
								backgroundColor: 'rgba(0, 0, 0, 0.3)',
							},
							':active': {
								backgroundColor: 'rgba(0, 0, 0, 0.4)',
							},
						}}
					>
						<SearchIcon />
					</Box>
				</Stack>
				{search !== '' && (
					<Box
						display={'flex'}
						width={'100%'}
						justifyContent={'space-between'}
						alignItems={'center'}
						borderTop={'1px solid'}
						borderColor={'var(--mui-palette-divider)'}
						p={0.5}
						bgcolor={'grey.A700'}
					>
						<Typography
							px={1}
							variant="body2"
							color="text.secondary"
							width={'100%'}
						>
							Pesquisando:{' '}
							<span
								style={{
									fontWeight: 'bold',
								}}
							>
								{search}
							</span>
						</Typography>
						<Chip
							label="Limpar"
							color="error"
							size="small"
							clickable
							onClick={() => {
								setSearchInput('');
								handleUpdate('');
							}}
						/>
					</Box>
				)}
			</Stack>
		</form>
	);
};

export default SearchInputComponent;
