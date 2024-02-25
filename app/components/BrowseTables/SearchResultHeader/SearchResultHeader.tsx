// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import SearchInputComponent from './SearchInputComponent';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2

interface SearchResultHeaderProps {}

const SearchResultHeader: FunctionComponent<SearchResultHeaderProps> = ({}) => {
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
		</Grid>
	);
};

export default SearchResultHeader;
