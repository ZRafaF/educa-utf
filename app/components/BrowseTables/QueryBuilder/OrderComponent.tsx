// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent, useCallback, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useLoadingQuery from '@/hooks/useLoadingQuery';

const orderTypeList = [
	{
		label: 'Asc.',
		value: '+',
	},
	{
		label: 'Desc.',
		value: '-',
	},
];

interface OrderComponentProps {}

const OrderComponent: FunctionComponent<OrderComponentProps> = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams()!;
	const router = useRouter();
	const [updateLoadingState] = useLoadingQuery();

	const sort = searchParams.get('sort') ?? '-created';

	const activeOrder = useMemo(() => {
		if (!sort) return 'Desc.';

		return sort[0] === '-' ? 'Desc.' : 'Asc.';
	}, [sort]);

	const currentSort = useMemo(() => {
		if (!sort) return 'created';

		// removes + or - from sort
		const filteredSort = sort.replace(/[-+]/g, '').trim();

		return filteredSort;
	}, [sort]);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);

			params.set(name, `${value}`);

			return decodeURIComponent(params.toString());
		},
		[searchParams]
	);

	const handleChangeItems = (orderValue: string) => {
		const newSearchParams = createQueryString(
			'sort',
			`${orderValue}${currentSort}`
		);
		updateLoadingState(searchParams.toString(), newSearchParams);
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
			<Typography>Ordem:</Typography>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={activeOrder}
				onChange={() => {}}
				label="Ordenar por"
				variant="standard"
			>
				{orderTypeList.map((oderType) => (
					<MenuItem
						key={oderType.value}
						value={oderType.label}
						onClick={() => {
							handleChangeItems(oderType.value);
						}}
					>
						{oderType.label}
					</MenuItem>
				))}
			</Select>
		</Stack>
	);
};

export default OrderComponent;
