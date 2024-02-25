// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import { FunctionComponent } from 'react';
import educaUtfLogoImage from '@/resources/logo-utf-sm.png';
import Box from '@mui/material/Box/Box';
import Image from 'next/image';

interface MainLogoProps {
	visible: boolean;
}

const MainLogo: FunctionComponent<MainLogoProps> = ({ visible }) => {
	return (
		<Box
			sx={{
				height: 20,
				maxHeight: { xs: 20, sm: 20 },
				objectFit: 'contain',
				display: visible ? 'inherit' : 'none',
				aspectRatio: '540/107',
				mr: 1,
			}}
		>
			<div style={{ position: 'relative', height: '100%' }}>
				<Image
					src={educaUtfLogoImage}
					sizes="100%"
					alt="Logo of EducaUTF"
					fill
					priority={true}
					quality={75}
				/>
			</div>
		</Box>
	);
};

export default MainLogo;
