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
import TitleIcon from '@mui/icons-material/Title';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

const headCells: readonly HeadCell[] = [
	{
		id: 'title',
		label: 'Titulo',
		icon: <TitleIcon />,
	},
	{
		id: 'views',
		label: 'Visualizações',
		icon: <VisibilityIcon />,
	},
	{
		id: 'likes',
		label: 'Likes',
		icon: <FavoriteIcon />,
	},
	{
		id: 'updated',
		label: 'Modificado em',
		icon: <AccessTimeIcon />,
	},
	{
		id: 'created',
		label: 'Criado em',
		icon: <DateRangeIcon />,
	},
];

interface DataTableHeadProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void;
	order: Order;
	orderBy: string;
}

const DataTableHead: FunctionComponent<DataTableHeadProps> = ({
	onRequestSort,
	order,
	orderBy,
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
						align={'left'}
						padding={'none'}
						sx={{
							pl: idx === 0 ? 2 : 0,
							py: 1,
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
				<TableCell
					align={'left'}
					padding={'none'}
					sx={{
						pl: 0,
						py: 1,
					}}
				>
					<Tooltip title="Filtrar lista" arrow placement="top">
						<Button
							variant="outlined"
							color="primary"
							sx={{
								minWidth: 0,
								width: 30,
								height: 30,
							}}
						>
							<FilterListIcon />
						</Button>
					</Tooltip>
					{
						// 	<Tooltip title="Filtrar lista">
						// 	<IconButton color="primary">
						// 		<FilterListIcon />
						// 	</IconButton>
						// </Tooltip>
					}
				</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default DataTableHead;
