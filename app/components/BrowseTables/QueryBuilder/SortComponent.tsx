// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import MenuItem from '@mui/material/MenuItem';
import { FunctionComponent, useCallback, useMemo } from 'react';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const sortTypeList = [
	{
		label: 'Data de criação',
		value: 'created',
	},
	{
		label: 'Data de atualização',
		value: 'updated',
	},
	{
		label: 'Titulo',
		value: 'slug',
	},
	{
		label: 'Visualizações totais',
		value: 'views',
	},
	{
		label: 'Visualizações recentes',
		value: 'latest_views',
	},
	{
		label: 'Número de likes',
		value: 'likes',
	},
];

interface SortComponentProps {}

const SortComponent: FunctionComponent<SortComponentProps> = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams()!;
	const router = useRouter();

	const sort = searchParams.get('sort') ?? '-created';

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);

			const order = sort[0] === '-' ? '-' : '+';

			params.set(name, `${order}${value}`);

			return decodeURIComponent(params.toString());
		},
		[searchParams, sort]
	);

	const activeValue = useMemo(() => {
		if (!sort) return 'Data de criação';

		// removes + or - from sort
		const filteredSort = sort.replace(/[-+]/g, '').trim();

		const sortType = sortTypeList.find(
			(sortType) => sortType.value === filteredSort
		);

		return sortType?.label ?? 'Data de criação';
	}, [sort]);

	const handleChangeItems = (sortLabel: string) => {
		const newSearchParams = createQueryString('sort', sortLabel);

		router.push(pathname + '?' + newSearchParams);

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<Stack
			direction="row"
			spacing={1}
			justifyContent="flex-start"
			alignItems="center"
		>
			<Typography>Ordenar por:</Typography>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={activeValue}
				onChange={() => {}}
				label="Ordenar por"
				variant="standard"
			>
				{sortTypeList.map((sortType) => (
					<MenuItem
						key={sortType.value}
						value={sortType.label}
						onClick={() => {
							handleChangeItems(sortType.value);
						}}
					>
						{sortType.label}
					</MenuItem>
				))}
			</Select>
		</Stack>
	);
};

export default SortComponent;
