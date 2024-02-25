// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useTheme } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import Box from '@mui/material/Box/Box';
import SearchField from '@/components/SearchField/SearchField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usePathname } from 'next/navigation';
interface SearchBarProps {
	isExtended: boolean;
	onlySmallScreen: boolean;
	setIsExtended: Dispatch<SetStateAction<boolean>>;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({
	isExtended,
	onlySmallScreen,
	setIsExtended,
}) => {
	const pathname = usePathname();
	const paths = pathname.split('/');
	const disabled = paths.length > 1 && paths[1] === 'browse';

	return (
		<Box
			sx={{ flexGrow: 1 }}
			display="flex"
			justifyContent={'center'}
			gap={1}
			mx={onlySmallScreen && isExtended ? -1 : 0}
		>
			<Box display={onlySmallScreen && isExtended ? 'block' : 'none'}>
				<Tooltip title="Fechar barra de busca" arrow>
					<IconButton
						aria-label="search"
						aria-haspopup="true"
						color="inherit"
						onClick={() => setIsExtended(false)}
					>
						<ArrowBackIcon />
					</IconButton>
				</Tooltip>
			</Box>

			<SearchField
				isExtended={isExtended}
				setIsExtended={setIsExtended}
			/>
		</Box>
	);
};

export default SearchBar;
