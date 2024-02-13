// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

interface EditUserInfoContentProps {}

const EditUserInfoContent: FunctionComponent<EditUserInfoContentProps> = () => {
	return (
		<Box p={1}>
			<Stack
				direction="column"
				justifyContent="center"
				alignItems="center"
				spacing={2}
			>
				<TextField
					id="outlined-basic"
					label="Nome de exibição"
					variant="outlined"
					fullWidth
					helperText="Máximo de 64 carácteres"
					inputProps={{
						maxLength: 64,
					}}
					multiline
				/>
				<TextField
					name="user-description"
					label="Descrição"
					helperText="Máximo de 256 carácteres"
					inputProps={{
						maxLength: 256,
					}}
					fullWidth
					multiline
					rows={5}
					autoComplete="user-description"
					//defaultValue={defaultValues.description}
				/>
			</Stack>
		</Box>
	);
};

export default EditUserInfoContent;
