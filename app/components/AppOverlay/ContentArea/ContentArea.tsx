// Copyright (c) 2023 Rafael Farias
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';

import Box from '@mui/material/Box/Box';
import { FunctionComponent, ReactNode } from 'react';

interface ContentAreaProps {
	children: ReactNode;
}

const ContentArea: FunctionComponent<ContentAreaProps> = ({ children }) => {
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				ml: { xs: 0, sm: 7 },
			}}
		>
			{children}
		</Box>
	);
};

export default ContentArea;
