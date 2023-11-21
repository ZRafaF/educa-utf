'use client';
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
import MoreDataOptions from './MoreDataOptions';
import Link from 'next/link';
import { ArticlesExpand, ChaptersExpandTags } from '@/types/expanded-types';

interface DataTableContentProps {
	rows:
		| ArticlesStatsResponse<ArticlesExpand>[]
		| ChaptersStatsResponse<ChaptersExpandTags>[];
	emptyRows: number;
}

const DataTableContent: FunctionComponent<DataTableContentProps> = ({
	rows,
	emptyRows,
}) => {
	return (
		<TableBody>
			{rows.map((row, index) => (
				<TableRow tabIndex={-1} key={row.title}>
					<TableCell
						id={`enhanced-table-checkbox-${index}`}
						scope="row"
						padding="none"
						colSpan={4}
						sx={{
							width: '100%',
						}}
					>
						<Link
							href={`/${'cover' in row ? 'chapter' : 'article'}/${
								row.id
							}`}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							<DataItem data={row} />
						</Link>
					</TableCell>
					<TableCell
						id={`enhanced-table-checkbox-${index}`}
						scope="row"
						padding="none"
						colSpan={1}
						align={'right'}
					>
						<MoreDataOptions data={row} />
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
