// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DataTableHandler from './DataTableHandler/DataTableHandler';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FetchType } from '@/types/data-table-type';

interface DataTableProps {
	title?: string;
	fetchType: FetchType;
}

const DataTable: FunctionComponent<DataTableProps> = ({ title, fetchType }) => {
	return (
		<>
			{title && (
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
						{title}
					</Typography>

					{
						// <Tooltip title="Filtrar lista">
						// 	<IconButton>
						// 		<FilterListIcon />
						// 	</IconButton>
						// </Tooltip>
					}
				</Toolbar>
			)}

			<DataTableHandler fetchType={fetchType} />
		</>
	);
};

export default DataTable;
