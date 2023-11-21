// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

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
import DateRangeIcon from '@mui/icons-material/DateRange';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
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
		id: 'created',
		label: 'Criado em',
		icon: <DateRangeIcon />,
	},
];

interface QueryBuilderProps {}

const QueryBuilder: FunctionComponent<QueryBuilderProps> = () => {
	const createSortHandler =
		(property: keyof Data) => (event: React.MouseEvent<unknown>) => {
			console.log(property);
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
							//pl: idx === 0 ? 2 : 0,
							pb: 1,
						}}
						sortDirection={false}
					>
						<TableSortLabel
							active={false}
							direction={'asc'}
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
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell
					align={'right'}
					padding={'none'}
					sx={{
						pb: 1,
					}}
				>
					{
						<Tooltip title="Filtrar lista" arrow placement="top">
							<Button
								variant="outlined"
								color="primary"
								sx={{ minWidth: 0 }}
							>
								<FilterListIcon fontSize="small" />
							</Button>
						</Tooltip>
					}
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

export default QueryBuilder;
