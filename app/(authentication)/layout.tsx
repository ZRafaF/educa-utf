// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import bgImage from "@/resources/utf-bg.jpg";
import Image from "next/image";
import MainLogoInverted from "@/components/AppOverlay/MainLogo/MainLogoInverted";
import Box from "@mui/material/Box/Box";
import Link from "next/link";

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
						height: "100%",
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
					<Box
						sx={{
							mt: 8,
							mb: 6,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Link href={"/"}>
							<MainLogoInverted height={40} />
						</Link>
					</Box>
					{children}
				</Grid>
			</Grid>
		</section>
	);
}
