// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import React, { useState } from 'react';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FiltersDialog from './FiltersDialog';

interface FiltersComponentProps {}

const FiltersComponent: React.FunctionComponent<FiltersComponentProps> = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<FiltersDialog handleClose={handleClose} isOpen={isOpen} />

			<Stack
				direction="row"
				spacing={1}
				justifyContent="flex-start"
				alignItems="center"
			>
				<Typography>Filtros:</Typography>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					label="Ordenar por"
					variant="standard"
					onOpen={() => {
						setIsOpen(true);
					}}
					defaultValue={'0'}
					open={false}
				/>
			</Stack>
		</>
	);
};

export default FiltersComponent;
