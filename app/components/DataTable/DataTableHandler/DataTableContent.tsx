'use client';

import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FunctionComponent } from 'react';
import { Data } from '@/types/data-table-type';

interface DataTableContentProps {
	rows: Data[];
	emptyRows: number;
}

const DataTableContent: FunctionComponent<DataTableContentProps> = ({
	rows,
	emptyRows,
}) => {
	return (
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
			{emptyRows > 0 && (
				<TableRow style={{ height: 21 * emptyRows }}>
					<TableCell colSpan={100} />
				</TableRow>
			)}
		</TableBody>
	);
};

export default DataTableContent;
