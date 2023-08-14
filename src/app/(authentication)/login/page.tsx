// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";

import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";

import bgImage from "@/resources/utf-bg.jpg";
import utfLogoImage from "@/resources/logo-utf-lg.png";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import LoginFormSender from "./LoginFormSender/LoginFormSender";
import LoginFormContent from "./LoginFormContent/LoginFormContent";
import Link from "next/link";
import Image from "next/image";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
	return (
		<Grid
			container
			component="main"
			sx={{
				position: "absolute",
				height: "stretch",
			}}
		>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					height: "stretch",
					overflow: "hidden",
					display: { xs: "none", sm: "block" },
				}}
			>
				<div style={{ position: "relative", height: "100%" }}>
					<Image src={bgImage} alt="campus utfpr" fill />
				</div>

				{/*<Link href={"/"}>
					<Box
						sx={{
							backgroundImage: {
								xs: "none",
								sm: `url(${utfLogoImage.src})`,
							},
							position: "absolute",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
							bottom: "20px",
							left: "20px",
							height: "5%",
							aspectRatio: "540/107",

							backgroundPosition: "center",
						}}
					/>
					</Link>*/}
			</Grid>

			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				component={Paper}
				elevation={6}
				square
			>
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
				</Box>
			</Grid>
		</Grid>
	);
};

export default LoginPage;
