// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FunctionComponent } from "react";
import educaUtfLogoImage from "@/resources/logo-utf-sm-inverted.png";
import Box from "@mui/material/Box/Box";
import Image from "next/image";

interface MainLogoProps {
	height?: number;
}

const MainLogo: FunctionComponent<MainLogoProps> = async ({ height = 20 }) => {
	return (
		<Box
			sx={{
				height: height,
				maxHeight: { xs: height, sm: height },
				objectFit: "contain",

				aspectRatio: "540/107",
			}}
		>
			<div style={{ position: "relative", height: "100%" }}>
				<Image
					src={educaUtfLogoImage}
					alt="Picture of the author"
					fill
				/>
			</div>
		</Box>
	);
};

export default MainLogo;
