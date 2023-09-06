// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from "@mui/material/Box/Box";
import { FunctionComponent } from "react";
import Typography from "@mui/material/Typography/Typography";
import { darkTheme } from "../Themes";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2
import Button from "@mui/material/Button/Button";
import Container from "@mui/material/Container/Container";
import NewPostsCarousel from "./NewPostsCarousel/NewPostsCarousel";

interface BannerSomethingNewProps {}

const BannerSomethingNew: FunctionComponent<BannerSomethingNewProps> = () => {
	return (
		<Box
			width={"100%"}
			bgcolor={"#427AA1"}
			mx={{ xs: -2, sm: -3 }}
			px={{ xs: 2, sm: 3 }}
			mb={3}
			py={3}
			boxShadow={5}
		>
			<Grid
				container
				spacing={2}
				width={"100%"}
				alignItems="center"
				justifyContent="center"
			>
				<Grid py={3} xs={14} sm={10} md={4}>
					<ThemeProvider theme={darkTheme}>
						<Box pl={2}>
							<Typography
								variant="h3"
								color="text.primary"
								fontWeight={700}
								sx={{
									textShadow:
										"0px 4px 4px rgba(0, 0, 0, 0.25)",
								}}
							>
								Descubra algo novo
							</Typography>

							<Typography
								variant="h6"
								color="text.secondary"
								mb={3}
							>
								Encontre seu novo conhecimento!
							</Typography>
							<Container>
								<Button
									variant="contained"
									sx={{ fontWeight: "bold" }}
									color="secondary"
								>
									Me surpreenda
								</Button>
							</Container>
						</Box>
					</ThemeProvider>
				</Grid>
				<Grid mr={-3} sm={20} md>
					<NewPostsCarousel />
				</Grid>
			</Grid>
		</Box>
	);
};

export default BannerSomethingNew;
