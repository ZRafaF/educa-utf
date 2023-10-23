// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
					label="Nome"
					variant="outlined"
					fullWidth
				/>
				<TextField
					name="user-description"
					label="Descrição"
					helperText="Máximo de 180 carácteres"
					inputProps={{
						maxLength: 180,
					}}
					fullWidth
					multiline
					rows={5}
					autoComplete="user-description"
					//defaultValue={defaultValues.description}
				/>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					<Button variant="outlined">Descartar</Button>
					<Button variant="contained">Atualizar</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default EditUserInfoContent;
