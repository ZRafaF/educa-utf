// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { FunctionComponent } from 'react';
import TextField from '@mui/material/TextField/TextField';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import PasswordInput from '@/components/PasswordInput/PasswordInput';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2/Grid2'; // Grid version 2
import UsernameInput from './UsernameInput';

interface RegisterFormContentProps {}

const RegisterFormContent: FunctionComponent<RegisterFormContentProps> = () => {
	return (
		<Grid container spacing={1}>
			<Grid xs={12}>
				<UsernameInput />
			</Grid>
			<Grid xs={12}>
				<TextField
					margin="dense"
					required
					fullWidth
					id="email"
					label="Email"
					name="email"
					type="email"
					autoComplete="email"
					inputProps={{
						minLength: 1,
						maxLength: 128,
					}}
				/>
			</Grid>
			<Grid xs={12}>
				<TextField
					margin="dense"
					required
					fullWidth
					id="name"
					label="Nome completo"
					name="name"
					type="text"
					autoComplete="nome completo"
					inputProps={{
						minLength: 1,
						maxLength: 128,
					}}
				/>
			</Grid>

			<Grid xs={12} sm={6}>
				<PasswordInput
					label="Senha"
					name="password"
					inputProps={{
						minLength: 6,
						maxLength: 128,
					}}
					helperText="Mínimo de 6 caracteres."
				/>
			</Grid>
			<Grid xs={12} sm={6}>
				<PasswordInput
					label="Confirme sua senha"
					name="password-confirm"
					inputProps={{
						minLength: 6,
						maxLength: 128,
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default RegisterFormContent;
