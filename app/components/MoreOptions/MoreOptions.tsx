// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
'use client';

import { FunctionComponent } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton/IconButton';

interface MoreOptionsProps {}

const MoreOptions: FunctionComponent<MoreOptionsProps> = () => {
	return (
		<IconButton
			aria-label="mais opções do post"
			size="small"
			onMouseDown={(event) => event.stopPropagation()}
			onClick={(event) => {
				event.stopPropagation();
				event.preventDefault();
				console.log('Button clicked');
			}}
		>
			<MoreVertIcon fontSize="small" />
		</IconButton>
	);
};

export default MoreOptions;
