// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import Typography from "@mui/material/Typography/Typography";

export default function Default() {
	return (
		<section>
			<Box sx={{ height: "100%" }}>
				<Stack
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={2}
				>
					<Typography
						variant="h3"
						color="text.primary"
						fontWeight={700}
					>
						Selecione um post
					</Typography>
				</Stack>
			</Box>
		</section>
	);
}
