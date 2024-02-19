// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

interface SearchInputComponentProps {}

const SearchInputComponent: FunctionComponent<
	SearchInputComponentProps
> = () => {
	return (
		<Box
			component={'input'}
			type="text"
			height={'2rem'}
			width={'20rem'}
			sx={{
				backgroundColor: 'grey.A200',
				borderRadius: 100,
				border: 'none ',
				borderWidth: '1px',
				padding: '0 1rem',
				fontSize: '1rem',
			}}
		></Box>
	);
};

export default SearchInputComponent;
