// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent } from 'react';
import { useTheme } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import Stack from '@mui/material/Stack/Stack';
import Box from '@mui/material/Box/Box';
import SearchField from '@/components/SearchField/SearchField';

interface SearchBarProps {}

const SearchBar: FunctionComponent<SearchBarProps> = () => {
	const theme = useTheme();
	const onlySmallScreen = useMediaQuery(theme.breakpoints.only('xs'));
	return (
		<Box
			sx={{ flexGrow: 1 }}
			display="flex"
			justifyContent={{ xs: 'end', sm: 'center' }}
		>
			{onlySmallScreen ? (
				<Stack direction="row" justifyContent="flex-end">
					<Tooltip title="Meu perfil" arrow>
						<IconButton
							size="large"
							aria-label="search"
							aria-haspopup="true"
							color="inherit"
						>
							<SearchIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			) : (
				<SearchField />
			)}
		</Box>
	);
};

export default SearchBar;
