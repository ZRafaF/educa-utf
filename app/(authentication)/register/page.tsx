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

import Link from "next/link";

interface pageProps {}

const page: FunctionComponent<pageProps> = () => {
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
				Registrar
			</Typography>
			<Grid container>
				<Grid item>
					<Link href="/login">{"Já tem uma conta? Login aqui!"}</Link>
				</Grid>
			</Grid>
		</Box>
	);
};

export default page;
