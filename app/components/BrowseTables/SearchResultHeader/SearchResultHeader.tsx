// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from '@mui/material/Box';
import { FunctionComponent, useCallback } from 'react';
import SearchInputComponent from './SearchInputComponent';
import Typography from '@mui/material/Typography';
import { ListResult } from 'pocketbase';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2

interface SearchResultHeaderProps {
	searchRecords: ListResult<unknown>;
}

const SearchResultHeader: FunctionComponent<SearchResultHeaderProps> = ({
	searchRecords,
}) => {
	return (
		<Grid
			container
			spacing={1}
			sx={{
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
			mb={2}
		>
			<Grid xs={12} sm={6} md={4.5} lg={3.5}>
				<SearchInputComponent />
			</Grid>
			<Grid xs={12} sm display={'flex'} justifyContent={'flex-end'}>
				<Typography
					variant="caption"
					gutterBottom
					width={'100%'}
					textAlign={'right'}
				>
					Total de itens encontrados: {searchRecords.totalItems}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default SearchResultHeader;
