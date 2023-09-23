// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { FunctionComponent } from 'react';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Checkbox from '@mui/material/Checkbox/Checkbox';

interface LoginFormContentProps {}

const LoginFormContent: FunctionComponent<LoginFormContentProps> = () => {
	return (
		<React.Fragment>
			<TextField
				margin="normal"
				required
				fullWidth
				id="login"
				label="Usuário ou Email"
				name="login"
				type="text"
				autoComplete="login"
				autoFocus
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				inputProps={{
					minLength: 6,
					maxLength: 72,
				}}
				name="password"
				label="Senha"
				type="password"
				id="password"
				autoComplete="current-password"
			/>
			<FormControlLabel
				control={
					<Checkbox
						value="remember"
						color="primary"
						name="remember"
						id="remember"
					/>
				}
				label="Manter-me conectado"
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}
			>
				Login
			</Button>
			{/*<OcRegisterWithGoogle />*/}
		</React.Fragment>
	);
};

export default LoginFormContent;
