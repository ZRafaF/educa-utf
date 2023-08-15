// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import bgImage from "@/resources/utf-bg.jpg";
//import utfLogoImage from "@/resources/logo-utf-lg.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//import Link from "next/link";
import Image from "next/image";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";

export default function LoginLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<Grid
				container
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
					<Link href={"/"}>
						<Tooltip
							title={"Voltar ao inicio"}
							arrow
							placement="right"
						>
							<Fab
								aria-label="voltar para o inicio"
								variant="extended"
								sx={{
									position: "absolute",
									m: 2,
								}}
							>
								<ArrowBackIcon />
								Voltar
							</Fab>
						</Tooltip>
					</Link>
					{children}
				</Grid>
			</Grid>
		</section>
	);
}
