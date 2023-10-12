import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FunctionComponent } from 'react';
import {
	ArticlesStatsResponse,
	ChaptersStatsResponse,
} from '@/types/pocketbase-types';
import DataItem from './DataItem';

interface DataTableContentProps {
	rows: ArticlesStatsResponse[] | ChaptersStatsResponse[];
	emptyRows: number;
}

const DataTableContent: FunctionComponent<DataTableContentProps> = ({
	rows,
	emptyRows,
}) => {
	return (
		<TableBody>
			{rows.map((row, index) => (
				<TableRow
					hover
					tabIndex={-1}
					key={row.title}
					sx={{
						cursor: 'pointer',
					}}
				>
					<TableCell
						id={`enhanced-table-checkbox-${index}`}
						scope="row"
						padding="none"
						colSpan={99}
					>
						<DataItem data={row} />
					</TableCell>
				</TableRow>
			))}
			{emptyRows > 0 && (
				<TableRow style={{ height: 61.41 * emptyRows }}>
					<TableCell colSpan={100} />
				</TableRow>
			)}
		</TableBody>
	);
};

export default DataTableContent;
