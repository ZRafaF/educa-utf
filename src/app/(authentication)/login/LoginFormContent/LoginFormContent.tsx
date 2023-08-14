// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from "react";
import { FunctionComponent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Link from "next/link";

interface LoginFormContentProps {}

const LoginFormContent: FunctionComponent<LoginFormContentProps> = () => {
	return (
		<React.Fragment>
			<TextField
				margin="normal"
				required
				fullWidth
				id="email"
				label="Endereço de email"
				name="email"
				type="email"
				autoComplete="email"
				autoFocus
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				inputProps={{
					minLength: 8,
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
				sx={{ mt: 3, mb: 2 }}
			>
				Login
			</Button>
			{/*<OcRegisterWithGoogle />*/}
			<Grid container>
				<Grid item xs>
					<Link href="#">Esqueci minha senha</Link>
				</Grid>
				<Grid item>
					<Link href="/register">
						{"Não possui uma conta? Registre aqui!"}
					</Link>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default LoginFormContent;
