// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Data, HeadCell, Order } from '@/types/data-table-type';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { FunctionComponent } from 'react';
import { visuallyHidden } from '@mui/utils';

interface DataTableHeadProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void;
	order: Order;
	orderBy: string;
	headCells: readonly HeadCell[];
}

const DataTableHead: FunctionComponent<DataTableHeadProps> = ({
	onRequestSort,
	order,
	orderBy,
	headCells,
}) => {
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell, idx) => (
					<TableCell
						key={headCell.id}
						align={'center'}
						padding={'none'}
						sx={{
							pl: idx === 0 ? 2 : 0,
						}}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
							sx={{
								fontWeight: 600,
							}}
						>
							<Tooltip
								title={headCell.label}
								arrow
								placement="top"
							>
								{headCell.icon}
							</Tooltip>

							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc'
										? 'sorted descending'
										: 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default DataTableHead;
