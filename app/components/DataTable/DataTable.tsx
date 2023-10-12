// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent, useCallback } from 'react';
import {
	DataGrid,
	GridCallbackDetails,
	GridColDef,
	GridPaginationModel,
	GridSortModel,
	GridValueGetterParams,
} from '@mui/x-data-grid';
const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'firstName',
		headerName: 'First name',
		width: 150,
		editable: true,
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		width: 150,
		editable: true,
	},
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 110,
		editable: true,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params: GridValueGetterParams) =>
			`${params.row.firstName || ''} ${params.row.lastName || ''}`,
	},
];

const rows = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

interface DataTableProps {}

const DataTable: FunctionComponent<DataTableProps> = () => {
	const handleSortModelChange = useCallback(
		(model: GridSortModel, details: GridCallbackDetails<any>) => {
			// Here you save the data you need from the sort model
			console.log(model);
		},
		[]
	);
	const handlePaginationModelChange = useCallback(
		(model: GridPaginationModel, details: GridCallbackDetails<any>) => {
			// Here you save the data you need from the sort model
			console.log(model);
		},
		[]
	);

	return (
		<DataGrid
			rows={rows}
			columns={columns}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			disableColumnSelector
			disableRowSelectionOnClick
			disableColumnMenu
			disableEval
			onSortModelChange={handleSortModelChange}
			onPaginationModelChange={handlePaginationModelChange}
			loading={false}
			pageSizeOptions={[5, 10, 25, 50]}
			sx={{
				borderRadius: 0,
				height: 400,
			}}
		/>
	);
};

export default DataTable;
