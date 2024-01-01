// Copyright (c) 2024 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { FunctionComponent } from 'react';

interface AuthorPickerProps {}

const AuthorPicker: FunctionComponent<AuthorPickerProps> = () => {
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={top100Films}
			renderInput={(params) => (
				<TextField {...params} label="Escrito por" fullWidth />
			)}
		/>
	);
};

export default AuthorPicker;

const top100Films = [
	{ label: 'The Shawshank Redemption', year: 1994 },
	{ label: 'The Godfather', year: 1972 },
	{ label: 'The Godfather: Part II', year: 1974 },
];
