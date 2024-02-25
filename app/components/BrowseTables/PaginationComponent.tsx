// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FunctionComponent, useCallback } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { MIN_PAGINATION_HEIGHT } from '@/lib/helper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Divider from '@mui/material/Divider';

const allowedItemsPerPage = [12, 24, 48, 96];

interface PaginationComponentProps {
	totalPages: number;
	totalItems: number;
}

const PaginationComponent: FunctionComponent<PaginationComponentProps> = ({
	totalPages = 1,
	totalItems,
}) => {
	const pathname = usePathname();
	const searchParams = useSearchParams()!;
	const router = useRouter();

	const sort = searchParams.get('items') ?? '24';
	const page = searchParams.get('page') ?? '1';

	const createQueryString = useCallback(
		(
			updatedParams: {
				name: string;
				value: string;
			}[]
		) => {
			const params = new URLSearchParams(searchParams);

			updatedParams.forEach(({ name, value }) => {
				params.set(name, `${value}`);
			});

			return decodeURIComponent(params.toString());
		},
		[searchParams]
	);

	const handleClick = (sortLabel: string) => {
		router.push(
			pathname +
				'?' +
				createQueryString([
					{
						name: 'items',
						value: sortLabel,
					},
					{
						name: 'page',
						value: '1',
					},
				])
		);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number
	) => {
		router.push(
			pathname +
				'?' +
				createQueryString([
					{
						name: 'page',
						value: `${value}`,
					},
				])
		);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			<Divider
				variant="middle"
				sx={{
					mt: 2,
				}}
			/>
			<Grid
				container
				spacing={2}
				minHeight={MIN_PAGINATION_HEIGHT}
				mx={2}
				my={3}
				justifyContent="center"
				alignItems="center"
			>
				<Grid>
					<Pagination
						count={totalPages}
						shape="rounded"
						onChange={handlePageChange}
						page={Number(page) ?? 1}
					/>
				</Grid>
				<Grid>
					<Stack
						direction="row"
						spacing={2}
						justifyContent="flex-start"
						alignItems="center"
					>
						<Typography>Itens por página: </Typography>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={sort}
							label="Age"
							variant="standard"
						>
							{allowedItemsPerPage.map((item) => (
								<MenuItem
									key={`item_${item}`}
									value={item}
									onClick={() => {
										handleClick(`${item}`);
									}}
								>
									{item}
								</MenuItem>
							))}
						</Select>
					</Stack>
				</Grid>
				<Grid>
					<Typography
						variant="caption"
						gutterBottom
						width={'100%'}
						textAlign={'right'}
					>
						Total de itens: {totalItems}
					</Typography>
				</Grid>
			</Grid>
		</>
	);
};

export default PaginationComponent;
