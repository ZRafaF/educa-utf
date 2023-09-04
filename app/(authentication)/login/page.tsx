// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import Avatar from "@mui/material/Avatar/Avatar";
import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import LoginFormSender from "./LoginFormSender/LoginFormSender";
import LoginFormContent from "./LoginFormContent/LoginFormContent";
import Link from "next/link";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
	return (
		<Box
			sx={{
				my: 8,
				mx: 4,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Login
			</Typography>
			<LoginFormSender>
				<LoginFormContent />
			</LoginFormSender>
			<Grid container>
				<Grid item xs>
					<Link href="#">Esqueci minha senha</Link>
				</Grid>
				<Grid item>
					<Link href="/register">{"Registre-se aqui!"}</Link>
				</Grid>
			</Grid>
		</Box>
	);
};

export default LoginPage;
