// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Container from "@mui/material/Container/Container";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default async function RootLayout(props: {
	children: React.ReactNode;
	inner: React.ReactNode;
}) {
	return (
		<section>
			<Grid container minHeight={"90vh"}>
				<Grid
					sx={{
						backgroundColor: "#F2F2F2",
						width: 350,
					}}
					p={2}
					boxShadow={3}
				>
					{props.children}
				</Grid>

				<Grid>
					<Container>{props.inner}</Container>
				</Grid>
			</Grid>
		</section>
	);
}
