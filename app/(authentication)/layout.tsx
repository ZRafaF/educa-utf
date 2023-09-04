// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import bgImage from "@/resources/utf-bg.jpg";
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
					width: "stretch",
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
						<Image
							src={bgImage}
							alt="campus utfpr"
							layout={"fill"}
							objectFit={"cover"}
						/>
					</div>
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
							title={"Voltar ao início"}
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
								Início
							</Fab>
						</Tooltip>
					</Link>
					{children}
				</Grid>
			</Grid>
		</section>
	);
}
