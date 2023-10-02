// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha, useTheme } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import Stack from '@mui/material/Stack/Stack';
import Box from '@mui/material/Box/Box';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: theme.spacing(2),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	},
}));

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
				<Search sx={{ maxWidth: '600px', width: '100%' }}>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Buscar"
						inputProps={{ 'aria-label': 'buscar' }}
					/>
				</Search>
			)}
		</Box>
	);
};

export default SearchBar;
