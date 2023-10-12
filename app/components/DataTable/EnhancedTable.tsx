'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import { RecordOptions } from 'pocketbase';
import { useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getFormattedDate } from '@/lib/helper';
import { getListOfArticlesStats } from '@/lib/apiHelpers/articlesAPI';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TitleIcon from '@mui/icons-material/Title';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';

interface Data {
	title: string;
	views: number;
	likes: number;
	updated: string;
	created: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	id: keyof Data;
	label: string;
	numeric: boolean;
	icon: JSX.Element;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'title',
		numeric: false,
		label: 'Titulo',
		icon: <TitleIcon />,
	},
	{
		id: 'views',
		numeric: true,
		label: 'Views',
		icon: <VisibilityIcon />,
	},
	{
		id: 'likes',
		numeric: true,
		label: 'Likes',
		icon: <FavoriteIcon />,
	},
	{
		id: 'updated',
		numeric: true,
		label: 'Atualizado',
		icon: <AccessTimeIcon />,
	},

	{
		id: 'created',
		numeric: true,
		label: 'Criado',
		icon: <DateRangeIcon />,
	},
];

interface EnhancedTableProps {
	onRequestSort: (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => void;
	order: Order;
	orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } = props;
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
}

export default function EnhancedTable() {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<keyof Data>('title');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [queryOptions, setQueryOptions] = React.useState<
		RecordOptions | undefined
	>();
	const [rows, setRows] = React.useState<Data[]>([]);
	const [totalItems, setTotalItems] = React.useState<number>(0);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: keyof Data
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);

		const newSort = `${isAsc ? '+' : '-'}${property}`;
		setQueryOptions((old) => ({
			...old,
			sort: newSort,
		}));
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		const fetchNewData = async () => {
			const data = await getListOfArticlesStats(
				page + 1,
				rowsPerPage,
				queryOptions
			);

			setTotalItems(data.totalItems);
			setRows(
				data.items.map((row) => {
					return {
						title: row.title,
						views: row.views,
						likes: row.likes,
						updated: getFormattedDate(row.updated),
						created: getFormattedDate(row.created),
					} as Data;
				})
			);
		};

		fetchNewData();
	}, [queryOptions, page, rowsPerPage]);

	return (
		<>
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
				}}
			>
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					Nutrition
				</Typography>

				<Tooltip title="Filtrar lista">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			</Toolbar>

			<TableContainer>
				<Table aria-labelledby="tableTitle" size={'small'}>
					<EnhancedTableHead
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>
					<TableBody>
						{rows.map((row, index) => {
							const labelId = `enhanced-table-checkbox-${index}`;

							return (
								<TableRow
									hover
									tabIndex={-1}
									key={row.title}
									sx={{
										cursor: 'pointer',
									}}
								>
									<TableCell
										id={labelId}
										scope="row"
										padding="checkbox"
										colSpan={Object.keys(row).length}
									>
										{row.title}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={totalItems}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelRowsPerPage={'Itens por página'}
				labelDisplayedRows={({ from, to, count }) => {
					return `${from}–${to} de ${
						count !== -1 ? count : `mais de ${to}`
					}`;
				}}
			/>
		</>
	);
}
